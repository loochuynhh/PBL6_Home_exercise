import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Token } from "@mui/icons-material";
import axiosInstance from '../axiosConfig';
const WorkoutDetailsPage = () => {
  const { id } = useParams();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem('accessToken')
  const [currentPage, setCurrentPage] = useState(1);
  const [showOverlay, setShowOverlay] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [overlayTitle, setOverlayTitle] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    if (!id) {
      toast.error("No plan ID provided.");
      return;
    }
    const fetchExercises = async () => {
      try {
        const { data: response } = await axiosInstance.get(`/public/api/exercises/all?planId.equals=${id}`);
        const { data: exerciseData } = await axiosInstance.get(`/public/api/exercises/all?planId.equals=${id}`);
        const { data: exercisePlanData } = await axiosInstance.get(`/api/exercise-plans/all`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })

        const listExerciseId = exerciseData.map(exercise => exercise.id)
        const listExercisePlan = exercisePlanData.filter(ex_p => listExerciseId.includes(ex_p.exerciseId))

        setExercises(response);
      } catch (error) {
        console.error("Error fetching exercises:", error);
        toast.error("Failed to load exercises. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [id]);

  const handleOpenOverlay = (url, title) => {
    setVideoUrl(url);
    setOverlayTitle(title);
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
    setVideoUrl("");
    setOverlayTitle("");
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const currentItems = exercises.slice(indexOfLastItem - itemsPerPage, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(exercises.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mx-[5%] text-black dark:text-white p-4">
      <div className="container text-black dark:text-white p-4">
        <div className="text-center mb-8 animate__animated animate__fadeIn">
          <h2 className="text-4xl font-extrabold sm:text-5xl leading-tight dark:text-blue-600 transition duration-300 ease-in-out transform hover:scale-110">
            Exercise List
          </h2>
          <p className="text-lg text-gray-600 dark:text-zinc-400 max-w-xl italic mt-4 mx-auto px-2 transition duration-300 ease-in-out">
            Explore different exercises to enhance your workout routine.
          </p>
        </div>

        <div className="flex items-center justify-between w-full max-w-lg mt-6 animate__animated animate__fadeIn">
          <span className="text-sm font-semibold dark:text-gray-400">
            <span className="text-base font-semibold">{exercises.length}</span> EXERCISES FOUND
          </span>
        </div>
        <div className="flow-root">
          {loading ? (
            <div className="flex justify-center items-center min-h-screen animate__animated animate__fadeIn">
              <p className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-4 py-2 text-lg text-black dark:text-white animate__animated animate__fadeIn">
                Loading...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {currentItems.map((exercise) => (
                <div
                  key={exercise.id}
                  className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 transition duration-300 ease-in-out hover:shadow-lg cursor-pointer"
                  onClick={() => handleOpenOverlay(exercise.publicVideoUrl, exercise.name)}
                >
                  <div className="mb-2">
                    <a target="_blank" rel="noopener noreferrer">
                      <img src={exercise.publicImageUrl} alt={exercise.name} className="w-full h-48 object-cover rounded-md" />
                    </a>
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{exercise.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-zinc-400">{exercise.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden w-11/12 max-w-3xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
              <h2 className="text-lg font-bold text-gray-800">
                Sample video for {overlayTitle} exercise
              </h2>
              <button
                onClick={handleCloseOverlay}
                className="text-gray-700 dark:text-gray-300 hover:text-red-500 transition duration-300"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <video
                src={videoUrl}
                controls
                className="w-full h-auto rounded-md"
              />
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center mt-6">
        <nav>
          <ul className="flex space-x-2">
            {pageNumbers.map((number) => (
              <li key={number}>
                <button
                  onClick={() => paginate(number)}
                  className={`px-3 py-1 rounded-lg ${number === currentPage
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105'
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

export default WorkoutDetailsPage;
