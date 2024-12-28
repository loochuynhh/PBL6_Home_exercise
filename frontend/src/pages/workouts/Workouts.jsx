import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const WorkoutPlansPage = () => {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");  
  const [filter, setFilter] = useState({ totalDays: '', rating: '' }); 
  const [showFilter, setShowFilter] = useState(false);  
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('default');
  useEffect(() => {
    const fetchWorkoutPlans = async () => {
      try {
        const response = await axios.get('/public/api/plans/all');
        console.log(response);
        setWorkoutPlans(response.data);
      } catch (error) {
        console.error('Error fetching workout plans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutPlans();
  }, [setSortBy]);
  const sortWorkoutPlans = (plans) => {
    switch (sortBy) {
      case 'totalDays':
        return [...plans].sort((a, b) => a.totalDays - b.totalDays);
      case 'rating':
        return [...plans].sort((a, b) => b.rating - a.rating); 
      default:
        return plans; 
    }
  };
  const filteredWorkoutPlans = workoutPlans.filter((plan) => {
    const matchesSearchQuery =
      plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTotalDays =
      (filter.totalDays === '20' && plan.totalDays < 20) ||
      (filter.totalDays === '20-30' && plan.totalDays >= 20 && plan.totalDays <= 30) ||
      (filter.totalDays === '30-45' && plan.totalDays >= 30 && plan.totalDays <= 45) ||
      (filter.totalDays === '45' && plan.totalDays > 45) ||
      filter.totalDays === '';

    const matchesRating =
      (filter.rating && plan.rating >= parseInt(filter.rating)) || filter.rating === '';

    return matchesSearchQuery && matchesTotalDays && matchesRating;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const currentItems = filteredWorkoutPlans.slice(indexOfLastItem - itemsPerPage, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredWorkoutPlans.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const toggleFilterOverlay = () => {
    setShowFilter(!showFilter);
  };
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    const sortedPlans = sortWorkoutPlans(filteredWorkoutPlans);
    setWorkoutPlans(sortedPlans);
  };

  return (
    <div className="mx-[5%] text-black dark:text-white p-4">
      <div className="text-center mb-8 animate__animated animate__fadeIn">
        <h2 className="text-4xl font-extrabold sm:text-5xl leading-tight dark:text-blue-600 transition duration-300 ease-in-out transform hover:scale-110">
          Workout Plans List
        </h2>
        <p className="text-lg text-gray-600 dark:text-zinc-400 max-w-xl italic mt-4 mx-auto px-2 transition duration-300 ease-in-out">
          Filter and refine your search to find the perfect workout plan for your fitness goals.
        </p>
      </div>

      <div className="flex gap-4 items-center mt-8 max-w-lg animate__animated animate__fadeIn">
        <form className="relative flex-grow">
          <input
            placeholder="Search workouts"
            aria-label="Search"
            className="h-12 w-full px-10 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out shadow-lg hover:shadow-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}  
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="absolute left-3 top-3 w-5 h-5 text-gray-500"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </form>

        <button
          className="h-12 px-5 py-2 dark:bg-blue-600 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-semibold text-white dark:text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          type="button"
          onClick={toggleFilterOverlay}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 inline-block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
            />
          </svg>
          <span className="ml-2 hidden sm:inline-block">FILTERS</span>
        </button>
      </div>

      {showFilter && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-md w-full shadow-lg">
            <h3 className="text-lg font-semibold">Filter Workout Plans</h3>
            <div className="mt-4">
              <label className="block text-sm font-semibold">Total Days</label>
              <select
                name="totalDays"
                value={filter.totalDays}
                onChange={handleFilterChange}
                className="w-full mt-2 p-2 border rounded-lg"
              >
                <option value="">Select Range</option>
                <option value="20">Less than 20</option>
                <option value="20-30">20-30</option>
                <option value="30-45">30-45</option>
                <option value="45">Greater than 45</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold">Rating</label>
              <select
                name="rating"
                value={filter.rating}
                onChange={handleFilterChange}
                className="w-full mt-2 p-2 border rounded-lg"
              >
                <option value="">Select Rating</option>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} and above
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={toggleFilterOverlay}
                className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between max-w-lg mt-6 animate__animated animate__fadeIn">
        <span className="text-sm font-semibold dark:text-gray-400">
          <span className="text-base font-semibold">{filteredWorkoutPlans.length}</span> WORKOUTS FOUND
        </span>

        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 hidden sm:block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
            />
          </svg>
          <span className="text-xs font-semibold text-gray-200 dark:text-gray-800 hidden sm:block">SORT BY</span>
        <select
          onChange={handleSortChange}
          value={sortBy}
          className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-semibold text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        >
          <option value="default">Default</option>
          <option value="totalDays">Total Days</option>
          <option value="rating">Rating</option>
        </select>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (

        <div className="rounded-lg bg-white dark:bg-gray-800 mt-4 -mx-[--gutter] overflow-x-auto whitespace-nowrap shadow-md">
          <div className="inline-block min-w-full align-middle sm:px-[--gutter]">
            <table className="min-w-full text-left text-sm/6">
              <thead className="bg-blue-400 dark:bg-blue-400 text-zinc-100 dark:text-black-800">
                <tr>
                  <th className="border-b border-b-zinc-950/10 px-4 py-4 font-medium">Plan Name</th>
                  <th className="border-b border-b-zinc-950/10 px-4 py-4 font-medium">Total Days</th>
                  <th className="border-b border-b-zinc-950/10 px-4 py-4 font-medium">Rating</th>
                  <th className="border-b border-b-zinc-950/10 px-4 py-4 font-medium">Description</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((workoutPlan) => (
                  <tr key={workoutPlan.id} className="hover:bg-gray-50 dark:hover:bg-gray-200 transition duration-200 ease-in-out" 
                  onClick={() => navigate(`/workouts/${workoutPlan.id}`)}
                  >
                    <td className="whitespace-nowrap px-4 py-2">{workoutPlan.name}</td>
                    <td className="whitespace-nowrap px-4 py-2">{workoutPlan.totalDays}</td>
                    <td className="whitespace-nowrap px-4 py-2">{workoutPlan.rating}</td>
                    <td className="border-b border-zinc-950/5 py-4 px-4">{workoutPlan.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="flex justify-center mt-8">
        <nav>
          <ul className="flex gap-3">
            {pageNumbers.map((number) => (
              <li key={number}>
                <button
                  className={`px-4 py-2 rounded-lg ${currentPage === number ? 'bg-blue-600 text-white' : 'bg-gray-300 dark:bg-gray-600 text-black dark:text-white'} hover:bg-blue-700`}
                  onClick={() => paginate(number)}
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};


export default WorkoutPlansPage;