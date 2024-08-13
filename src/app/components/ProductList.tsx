"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Select from "react-select";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
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

const PrevArrow = ({ onClick }) => {
  return (
    <div
      className={"custom-arrow left-arrow"}
      onClick={onClick}
      aria-label="Previous"
    >
      <FaChevronLeft />
    </div>
  );
};

const NextArrow = ({ onClick }) => {
  return (
    <div
      className={` custom-arrow right-arrow`}
      onClick={onClick}
      aria-label="Next"
    >
      <FaChevronRight />
    </div>
  );
};

const ProductList: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [message, setMessage] = useState<string>("");
  const [selectedBodyType, setSelectedBodyType] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCars() {
      setLoading(true);
      const response = await fetch("/api/cars");
      const data = await response.json();
      if (data?.length) {
        setCars(data);
        setMessage("");
      } else {
        setMessage("No Cars Available...");
      }
      setLoading(false);
    }
    fetchCars();
  }, []);

  const bodyTypeOptions = [
    { value: "", label: "All Cars" },
    { value: "suv", label: "SUV" },
    { value: "sedan", label: "Sedan" },
    { value: "estate", label: "Estate" },
  ];

  const handleBodyTypeChange = (option) => {
    setSelectedBodyType(option);
  };

  // Update the filtering logic
  const filteredCars =
    selectedBodyType && selectedBodyType?.value
      ? cars.filter((car) => car?.bodyType === selectedBodyType?.value)
      : cars;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
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

  const SliderView = () => {
    return (
      <div className="slider-container">
        <div className="filter-bar" style={{ marginBottom: "20px" }}>
          <Select
            options={bodyTypeOptions}
            onChange={handleBodyTypeChange}
            value={selectedBodyType}
            isSearchable={false}
            placeholder="Filter by body type"
            isClearable
          />
        </div>

        <Slider {...settings}>
          {filteredCars.map((car) => (
            <div
              key={car?.id}
              className="vcc-card"
              style={{ margin: "0 10px" }}
            >
              <div style={{ textAlign: "left" }}>
                <p>
                  <b>{car?.bodyType}</b>
                </p>
                <h3>{car?.modelName}</h3>
                <p>{car?.modelType}</p>
              </div>

              <Image
                src={car?.imageUrl}
                alt={car?.modelName}
                width={300}
                height={200}
                layout="responsive"
                style={{ marginBottom: "10px" }}
              />

              <div className="vcc-card-actions">
                <Link
                  href={`/learn/${car?.id}`}
                  className="button-text vcc-button"
                >
                  LEARN
                </Link>
                <Link
                  href={`/shop/${car?.id}`}
                  className="button-text vcc-button"
                >
                  SHOP
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  };

  return (
    <div className="vcc-slider-container">
      {loading ? <Loader /> : message ? message : <SliderView />}
    </div>
  );
};

export default ProductList;
