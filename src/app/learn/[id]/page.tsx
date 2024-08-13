"use client"; // Add this line at the top

import { useParams } from "next/navigation"; // Use the correct import for the app directory
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "@/app/components/Loader";

// Define the Car type
interface Car {
  id: string;
  modelName: string;
  imageUrl: string;
  bodyType: string;
  modelType: string;
}

const LearnPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Specify the type for useParams
  const [car, setCar] = useState<Car | null>(null); // Use the Car type for state

  useEffect(() => {
    if (id) {
      const fetchCarDetails = async () => {
        const response = await fetch("/api/cars");
        const cars: Car[] = await response.json(); // Define the type for cars
        const selectedCar = cars.find((car) => car.id === id) || null; // Ensure selectedCar is null if not found
        setCar(selectedCar);
      };
      fetchCarDetails();
    }
  }, [id]);

  return (
    <>
      {!car ? (
        <Loader />
      ) : (
        <div className="vcc-card">
          <h1>{car.modelName}</h1>
          <Image
            src={car.imageUrl}
            alt={car.modelName}
            width={600}
            height={400}
          />
          <p>Body Type: {car.bodyType}</p>
          <p>Model Type: {car.modelType}</p>
          <p>Learn more about the {car.modelName}.</p>
        </div>
      )}
    </>
  );
};

export default LearnPage;
