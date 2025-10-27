import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { letters, professionTexts, aboutText } from "../data";

function Hero() {
  const [hoveredLetter, setHoveredLetter] = useState(null);
  const [currentText, setcurrentText] = useState(professionTexts[0]);
  const [isRotating, setIsRoating] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  let currentIndex = 0;
  useEffect(() => {
    const interval = setInterval(() => {
      setIsRoating(true);
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % professionTexts.length;
        setcurrentText(professionTexts[currentIndex]);
        setIsRoating(false);
      }, 200);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center isolate">
      <Navbar />
      <div className="flex flex-col md:items-center items-start xl:gap-y-10 gap-y-3 xl:mb-0 md:mb-20 mb-0">
        <h1 className="flex flex-col xl-space-y-8 md:space-y-4 space-y-2 xl:text-6xl md:text-4xl text-3xl md:font-normal font-bolder text-yellow-500">
          <span className="flex">
            {letters.map((letters, index) => (
              <span
                key={index}
                className=" inline-block md:w-38 w-32 xl:-mr-25 -mr-24 relative  cursor-pointer"
                onMouseEnter={() => setHoveredLetter(index)}
                onMouseOut={() => setHoveredLetter(null)}
              >
                {letters.char}
                <img
                  src={letters.img}
                  alt={`Hover image ${index + 1}`}
                  className={`xl:h-36 h-24 absolute bottom-full -translate-x-1/2 ${
                    letters.rotate
                  } ${hoveredLetter === index ? "visible" : "invisible"}`}
                />
              </span>
            ))}
          </span>
          <span className="xl:text-6xl md:text-4xl text-2xl tracking-wider  xl:py-4 py-2 overflow-hidden">
            I'am{" "}
            <span
              className={`inline-block xl:w-[380px] md:w-[240px] w-[160px] lg:ml-6 ml-2 font-extrabold transform origin-left transition-transform duration-300 ease-out${
                isRotating ? "rotate-[100deg]" : "rotate-0"
              }`}
            >
              {" "}
              {currentText}
            </span>
            Web Developer
          </span>
        </h1>
        <button
          className="xl:w-[400px] md:w-[300px] w-[270px] bg-gray-200 md:py-1 py-0 md:px-4 px-2 
          xl:text-2xl xl:text-2xl md:text-xl text-base text-gray-800 tracking-widest rounded-r-4xl flex justify-between items-center md:mr-auto md:mx-0 mx-auto"
          onClick={() => setIsTextVisible(!isTextVisible)}
        >
          Read My Story <i className="bx bx-book-open"></i>
        </button>
        <div className="lg:w-[600px] md:w-[500px] w-[350px] absolute left-1/2 -translate-x-1/2 -z-10">
          <img
            src="/public/images/road.png"
            alt="Road Image"
            className="w-full mx-auto"
          />
          <div
            className={`xl:h-[150px] h-[100px] px-3 xl:text-lg md:text-base text-xs font-light
               text-gray-200 text-justify tracking-wide  overflow-y-auto origin-top transform custom-scrollbar ${
                 isTextVisible ? "scale-y-100" : "scale-y-0"
               } transition-transform duration-300 `}
          >
            <p className="xl:py-3 py-1 px-1 [&::first-letter]:text-[30px] [&::first-letter]:ml-5 [&::first-letter]:text-yellow-500">
              {aboutText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
