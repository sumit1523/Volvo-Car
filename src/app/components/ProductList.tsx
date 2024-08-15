"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Select } from "@volvo-cars/react-forms";
import { IconButton } from "@volvo-cars/react-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Loader from "./Loader";
import Link from "next/link";

interface Car {
  id: string;
  modelName: string;
  bodyType: string;
  modelType: string;
  imageUrl: string;
}

interface ArrowProps {
  onClick: () => void;
}

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <IconButton
    aria-label="Close"
    iconName="navigation-chevronback"
    onClick={onClick}
    className="custom-arrow left-arrow"
  />
);

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <IconButton
    aria-label="Close"
    iconName="navigation-chevronforward"
    onClick={onClick}
    className="custom-arrow right-arrow"
  />
);

const ProductList: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedBodyType, setSelectedBodyType] = useState("all");

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/cars");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Car[] = await response.json();
        if (data.length) {
          setCars(data);
          setFilteredCars(data);
          setMessage("");
        } else {
          setMessage("No Cars Available...");
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
        setMessage("Failed to fetch cars.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const bodyTypeOptions = [
    { value: "all", label: "All Cars" },
    { value: "suv", label: "SUV" },
    { value: "sedan", label: "Sedan" },
    { value: "estate", label: "Estate" },
  ];

  const handleBodyTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value;
    setSelectedBodyType(selectedType);
    setFilteredCars(
      selectedType === "all"
        ? cars
        : cars.filter((car) => car.bodyType === selectedType)
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <PrevArrow onClick={() => {}} />,
    nextArrow: <NextArrow onClick={() => {}} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  const SliderView = () => (
    <div className="slider-container">
      <div className="filter-bar" style={{ marginBottom: "20px" }}>
        <Select
          label="Select a car model"
          name="bodyType"
          value={selectedBodyType}
          onChange={handleBodyTypeChange}
        >
          {bodyTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>

      <Slider {...settings} lazyLoad="ondemand">
        {filteredCars.map((car) => (
          <div key={car.id} className="vcc-card" style={{ margin: "0 10px" }}>
            <div style={{ textAlign: "left" }}>
              <p>
                <b>{car.bodyType}</b>
              </p>
              <h3>{car.modelName}</h3>
              <p>{car.modelType}</p>
            </div>

            <Image
              src={car.imageUrl}
              alt={car.modelName}
              width={300}
              height={200}
              layout="responsive"
              style={{ marginBottom: "10px" }}
              priority
            />

            <div className="vcc-card-actions">
              <Link
                href={`/learn/${car.id}`}
                className="button-text vcc-button"
              >
                LEARN
              </Link>
              <Link href={`/shop/${car.id}`} className="button-text vcc-button">
                SHOP
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );

  return (
    <div className="vcc-slider-container">
      {loading ? <Loader /> : message || <SliderView />}
    </div>
  );
};

export default ProductList;
