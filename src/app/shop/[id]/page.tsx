"use client"; // Add this line at the top

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "@/app/components/Loader";

const ShopPage: React.FC = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchCarDetails = async () => {
        const response = await fetch("/api/cars");
        const cars = await response.json();
        const selectedCar = cars.find((car) => car?.id === id);
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
          <h1>{car?.modelName}</h1>
          <Image
            src={car?.imageUrl}
            alt={car?.modelName}
            width={600}
            height={400}
          />
          <p>Body Type: {car?.bodyType}</p>
          <p>Model Type: {car?.modelType}</p>
          <p>Learn more about the {car?.modelName}.</p>
        </div>
      )}
    </>
  );
};

export default ShopPage;
