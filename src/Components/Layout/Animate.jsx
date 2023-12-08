import React, { useCallback, useEffect, useState } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import reactIcon from "./../../assets/Images/technology/react.svg";
import codeigniterIcon from "./../../assets/Images/technology/codeigniter.svg";
import jQueryIcon from "./../../assets/Images/technology/jQuery.svg";
import JsIcon from "./../../assets/Images/technology/Js.svg";
import laravelIcon from "./../../assets/Images/technology/laravel.svg";
import linuxIcon from "./../../assets/Images/technology/linux.svg";
import nodeIcon from "./../../assets/Images/technology/node.svg";
import wordpressIcon from "./../../assets/Images/technology/wordpress.svg";
import phpIcon from "./../../assets/Images/technology/php.svg";
import cssIcon from "./../../assets/Images/technology/css.svg";

const Animate = () => {
  const [shuffledImages, setShuffledImages] = useState([]);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  useEffect(() => {
    const isLowEnd = false;
    setIsLowEndDevice(isLowEnd);

    const imagesArray = [
      { src: reactIcon, height: 100, width: 100 },
      { src: wordpressIcon, height: 100, width: 100 },
      { src: nodeIcon, height: 100, width: 100 },
      { src: laravelIcon, height: 100, width: 100 },
      { src: JsIcon, height: 100, width: 100 },
      { src: jQueryIcon, height: 100, width: 100 },
      { src: codeigniterIcon, height: 100, width: 100 },
      { src: linuxIcon, height: 100, width: 100 },
      { src: phpIcon, height: 100, width: 100 },
      { src: cssIcon, height: 100, width: 100 },
    ];
    const shuffledArray = shuffleArray(imagesArray);
    setShuffledImages(shuffledArray);
  }, []);

  const shuffleArray = (array) => {
    const newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  // eslint-disable-next-line no-unused-vars
  const particlesLoaded = useCallback(async (container) => {}, []);

  if (isLowEndDevice) {
    // Fallback UI for low-end devices
    return <div className="fallback-container"></div>;
  }
  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "#ffffff",
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: false,
              mode: "push",
            },
            onDiv: {
              elementId: "repulse-div",
              enable: false,
              mode: "repulse",
            },
            onHover: {
              enable: true,
              mode: "bounce",
              parallax: {
                enable: false,
                force: 60,
                smooth: 10,
              },
            },
            resize: false,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 2,
            },
            connect: {
              distance: 80,
              lineLinked: {
                opacity: 0.5,
              },
              radius: 60,
            },
            grab: {
              distance: 400,
              lineLinked: {
                opacity: 1,
              },
            },
            push: {
              quantity: 2,
            },
            remove: {
              quantity: 2,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#fc7114",
          },
          collisions: {
            enable: false,
          },
          lineLinked: {
            blink: false,
            color: "#000",
            consent: false,
            distance: 150,
            enable: false,
            opacity: 0.4,
            width: 1,
          },
          move: {
            attract: {
              enable: false,
              rotate: {
                x: 600,
                y: 1200,
              },
            },
            bounce: false,
            direction: "none",
            enable: true,
            outMode: "out",
            random: false,
            speed: 2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 1000,
            },
            limit: 10,
            value: 10,
          },
          opacity: {
            animation: {
              enable: true,
              minimumValue: 0.2,
              speed: 0.3,
              sync: false,
            },
            random: true,
            value: 1,
          },
          rotate: {
            animation: {
              enable: true,
              speed: 5,
              sync: false,
            },
            direction: "random",
            random: true,
            value: 0,
          },
          shape: {
            type: "images",
            image: shuffledImages,
          },
          size: {
            value: { min: 35, max: 35 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default Animate;
