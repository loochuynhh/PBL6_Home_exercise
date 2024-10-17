import React, { useEffect, useState } from 'react';

export const WorkoutPlansPage = () => {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const login = async () => {
      // const options = {
      //   method: 'POST',
      //   headers: {Authorization: 'Bearer '},
      //   body: '{"username":"Admin","password":"Admin"}',
      // };

      // try {
      //   const response = await fetch('http://localhost:8080/api/auth/login', options);
      //   if (!response.ok) {
      //     throw new Error('Login failed: ' + response.status);
      //   }
      //   const data = await response.json();
      //   const { accessToken } = data;
      //   setAccessToken(accessToken);
      // } catch (error) {
      //   console.error('Error during login:', error);
      // }
      const options = {method: 'POST', body: '{"username":"Admin","password":"Admin"}'};
      
      fetch('http://localhost:8080/api/auth/login', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    };

    const fetchWorkoutPlans = async () => {
      if (!accessToken) return;

      const options = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
      };

      try {
        const response = await fetch('http://localhost:8080/api/plans/all', options);
        if (!response.ok) {
          throw new Error('Error fetching plans: ' + response.status);
        }
        const data = await response.json();
        setWorkoutPlans(data);
      } catch (error) {
        console.error('Error fetching workout plans:', error);
      } finally {
        setLoading(false);
      }
    };

    login();
    fetchWorkoutPlans();

  }, [accessToken]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = workoutPlans.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(workoutPlans.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (loading) return <p>Loading...</p>;


  return (
    <div className="flex flex-col items-center my-auto mx-auto max-w-7xl py-8 lg:py-12 sm:px-6 lg:px-8 text-black dark:text-white">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-4xl font-extrabold sm:text-5xl leading-tight">
          LH Workout Plans
        </h2>
        <p className="text-lg text-secondary-gray dark:text-zinc-400 max-w-xl italic mt-4">
          Filter and refine your search to find the perfect workout plan for your fitness goals.
        </p>
      </div>

      {/* Search Bar and Filters */}
      <div className="flex gap-4 items-center mt-8 w-full max-w-lg">
        <form className="relative flex-grow">
          <input
            placeholder="Search workouts"
            aria-label="Search"
            className="h-11 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
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

        {/* Filters Button */}
        <button
          className="h-11 px-5 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-semibold text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-transform duration-300 ease-in-out"
          type="button"
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

      {/* Workouts Count and Sort */}
      <div className="flex items-center justify-between w-full max-w-lg mt-6">
        <span className="text-sm font-semibold text-main-black dark:text-main-black">
          <span className="text-base font-semibold">{workoutPlans.length}</span> WORKOUTS FOUND
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
          <span className="text-xs font-semibold text-main-black hidden sm:block">SORT BY</span>
          <button
            type="button"
            className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-semibold text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-transform duration-300 ease-in-out"
          >
            Sort
          </button>
        </div>
      </div>

      {/* Workout Plans Table */}
      <div className="flow-root">
        <div className="rounded-lg bg-white mt-4 -mx-[--gutter] overflow-x-auto whitespace-nowrap">
          <div className="inline-block min-w-full align-middle sm:px-[--gutter]">
            <table className="min-w-full text-left text-sm/6">
              <thead className="bg-jefit-blue-100 text-zinc-500 dark:text-zinc-400">
                <tr>
                  <th className="border-b border-b-zinc-950/10 px-4 py-2 font-medium">Plan Name</th>
                  <th className="border-b border-b-zinc-950/10 px-4 py-2 font-medium">Status</th>
                  <th className="border-b border-b-zinc-950/10 px-4 py-2 font-medium">Total Days</th>
                  <th className="border-b border-b-zinc-950/10 px-4 py-2 font-medium">Rating</th>
                  <th className="border-b border-b-zinc-950/10 px-4 py-2 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((plan) => (
                  <tr key={plan.id}>
                    <td className="border-b border-zinc-950/5 py-4">{plan.name}</td>
                    <td className="border-b border-zinc-950/5 py-4">{plan.status}</td>
                    <td className="border-b border-zinc-950/5 py-4">{plan.totalDays}</td>
                    <td className="border-b border-zinc-950/5 py-4">{plan.rating}</td>
                    <td className="border-b border-zinc-950/5 py-4">{plan.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <nav>
          <ul className="flex space-x-2">
            {pageNumbers.map((number) => (
              <li key={number}>
                <button
                  onClick={() => paginate(number)}
                  className={`px-3 py-1 rounded-lg ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                    }`}
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