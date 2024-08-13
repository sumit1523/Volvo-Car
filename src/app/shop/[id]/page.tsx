"use client"; // Add this line at the top

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

const ShopPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      if (id) {
        const response = await fetch("/api/cars");
        const cars: Car[] = await response.json();
        const selectedCar = cars.find((car) => car.id === id);
        setCar(selectedCar || null);
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

export default ShopPage;
