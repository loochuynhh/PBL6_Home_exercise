import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Token } from "@mui/icons-material";

const WorkoutDetailsPage = () => {
  const { id } = useParams();
  const [exercises, setExercises] = useState([]);
  const [exercisePlan, setExercisePlan] = useState([])
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem('accessToken')

  useEffect(() => {
    if (!id) {
      toast.error("No plan ID provided.");
      return;
    }
    const fetchExercises = async () => {
      try {
        const { data: response } = await axios.get(`/public/api/exercises/all?planId.equals=${id}`);
        const { data: exerciseData } = await axios.get(`/public/api/exercises/all?planId.equals=${id}`);
        const { data: exercisePlanData } = await axios.get(`/api/exercise-plans/all`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })

        const listExerciseId = exerciseData.map(exercise => exercise.id)
        const listExercisePlan = exercisePlanData.filter(ex_p => listExerciseId.includes(ex_p.exerciseId))
        // console.log(listExercisePlan)
        setExercises(response);
        setExercisePlan(listExercisePlan)
      } catch (error) {
        console.error("Error fetching exercises:", error);
        toast.error("Failed to load exercises. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [id]);

  return (
    <div className="mx-[5%] text-black dark:text-white p-4">
      {/* Header */}
      <div className="text-center mb-8 animate__animated animate__fadeIn">
        <h2 className="text-4xl font-extrabold sm:text-5xl leading-tight dark:text-blue-600 transition duration-300 ease-in-out transform hover:scale-110">
          Workout Plan Details
        </h2>
        <p className="text-lg text-gray-600 dark:text-zinc-400 max-w-xl italic mt-4 mx-auto px-2 transition duration-300 ease-in-out">
          Explore the exercises tailored for your workout plan.
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center min-h-screen animate__animated animate__fadeIn">
          <p className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-4 py-2 text-lg text-black dark:text-white animate__animated animate__fadeIn">
            Loading...
          </p>
        </div>
      ) : exercises.length > 0 ? (
        <>
          {/* Exercise List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 transition duration-300 ease-in-out hover:shadow-lg"
              >
                <div className="mb-2">
                  {exercise.imagePath ? (
                    <a href={exercise.imagePath} target="_blank" rel="noopener noreferrer">
                      <img src={`../${exercise.imagePath}`} alt={exercise.name} className="w-full h-48 object-cover rounded-md" />
                    </a>
                  ) : exercise.videoPath ? (
                    <a href={exercise.publicVideoUrl} target="_blank" rel="noopener noreferrer">
                      <img
                        src={exercise.videoPath}
                        alt={exercise.name}
                        className="w-full h-48 object-cover rounded-md transition-transform duration-500 transform hover:scale-105"
                      />
                    </a>
                  ) : (
                    <p className="text-center text-gray-400">No image or video available</p>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-1">{exercise.name}</h3>
                <p className="text-sm text-gray-600 dark:text-zinc-400 mb-2">
                  Level: {exercise.user.level}
                </p>
                <p className="text-sm text-gray-600 dark:text-zinc-400">{exercise.description}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-lg text-gray-500 dark:text-gray-400">
          No exercises found for this workout plan.
        </p>
      )}
    </div>
  );
};

export default WorkoutDetailsPage;
