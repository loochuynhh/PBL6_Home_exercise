import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import axiosInstance from '../axiosConfig';
import { Card, CardContent, CardHeader } from "./card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import { Badge } from "./badge";
import { Button } from "./button";
import { Clock, Dumbbell, Repeat } from 'lucide-react';

const WorkoutDetailsPage = () => {
  const { id } = useParams();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem('accessToken')
  const [currentPage, setCurrentPage] = useState(1);
  const [showOverlay, setShowOverlay] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [overlayTitle, setOverlayTitle] = useState("");
  const itemsPerPage = 9;
  const [exercisePlan, setExercisePlan] = useState([]);

  useEffect(() => {
    if (!id) {
      toast.error("No plan ID provided.");
      return;
    }
    const fetchExercises = async () => {
      try {
        const { data: exerciseData } = await axiosInstance.get(`/public/api/exercises/all?planId.equals=${id}`);
        const { data: exercisePlanData } = await axiosInstance.get('/api/exercise-plans/all', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        const listExerciseId = exerciseData.map(exercise => exercise.id);
        const listExercisePlan = exercisePlanData.filter(ex_p => listExerciseId.includes(ex_p.exerciseId));
        
        setExercises(exerciseData);
        setExercisePlan(listExercisePlan);

        console.log('exerciseData: ',exerciseData)
        console.log('listExercisePlan: ',listExercisePlan)
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
  const currentItems = exercisePlan.slice(indexOfLastItem - itemsPerPage, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(exercisePlan.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8 animate__animated animate__fadeIn">
        <h2 className="text-4xl font-extrabold sm:text-5xl leading-tight dark:text-blue-600 transition duration-300 ease-in-out transform hover:scale-110">
          Exercise List
        </h2>
        <p className="text-lg text-gray-600 dark:text-zinc-400 max-w-xl italic mt-4 mx-auto px-2 transition duration-300 ease-in-out">
          List of exercises included in the selected workout plan
        </p>
      </div>
      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-lg">Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((plan) => {
            // Tìm exercise tương ứng với exerciseId trong plan
            const exercise = exercises.find((e) => e.id === plan.exerciseId);
            const exerciseImageUrl = exercise?.publicImageUrl || "/placeholder.svg"; // Default image if null
            const exerciseVideoUrl = exercise?.publicVideoUrl;
  
            return (
              <Card key={plan.id} className="overflow-hidden">
                <CardHeader className="bg-blue-400 text-primary-foreground p-4">
                  <h2 className="text-xl font-semibold">{exercise?.name}</h2>
                </CardHeader>
                <CardContent className="p-4">
                  <img 
                    src={exerciseImageUrl} 
                    alt={exercise?.name} 
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <p className="text-sm text-muted-foreground mb-4">{exercise?.description}</p>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="details">
                      <AccordionTrigger>Exercise Details</AccordionTrigger>
                      <AccordionTrigger>Day: {plan.datePlan.dateOrder}</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-2 gap-2">
                          <Badge variant="secondary" className="flex items-center gap-2">
                            <Repeat className="w-4 h-4" />
                            {plan.setCount} sets
                          </Badge>
                          <Badge variant="secondary" className="flex items-center gap-2">
                            <Dumbbell className="w-4 h-4" />
                            {plan.repCount} reps
                          </Badge>
                          <Badge variant="secondary" className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {plan.restTime}s rest
                          </Badge>
                          <Badge variant="secondary" className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Time {plan.datePlan.time}
                          </Badge>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Button 
                    className="w-full mt-4" 
                    onClick={() => handleOpenOverlay(exerciseVideoUrl, exercise?.name)}
                  >
                    {exerciseVideoUrl ? 'Watch Demo' : 'No Video Available'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
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
              {videoUrl ? (
                <video
                  src={videoUrl}
                  controls
                  className="w-full h-auto rounded-md"
                />
              ) : (
                <p>No video available for this exercise.</p>
              )}
            </div>
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

export default WorkoutDetailsPage;

