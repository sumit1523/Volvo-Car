"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "@/app/components/Loader";
interface Car {
  id: string;
  modelName: string;
  imageUrl: string;
  bodyType: string;
  modelType: string;
}

const LearnPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  useEffect(() => {
    if (!id) return;
    const fetchCarDetails = async () => {
      try {
        const response = await fetch("/api/cars");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const cars: Car[] = await response.json();
        const selectedCar = cars.find((car) => car.id === id) || null;
        setCar(selectedCar);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCarDetails();
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
