import React, { useRef, useEffect, useState } from "react";
import globeImage from "../assets/img/brand/globe8.svg";

export function Canvas(props) {
  const canvasRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(window.innerWidth * 0.45);
  const [canvasHeight, setCanvasHeight] = useState(window.innerHeight * 0.75);
  const [rotationX, setRotationX] = useState(Math.PI / 4); // Initial rotation angle in radians

  const imageScale = 0.45; // Scale factor for the image (adjust as needed)
  const rotationSpeed = 0.00008; // Adjust the rotation speed as needed

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Draw the background image
    const backgroundImage = new Image();
    backgroundImage.src = globeImage;

    let lastFrameTime = 0;

    const animateImage = (timestamp) => {
      const deltaTime = timestamp - lastFrameTime;
      lastFrameTime = timestamp;

      // Clear canvas
      context.clearRect(0, 0, canvasWidth, canvasHeight);

      // Update rotation angle
      setRotationX((prevAngle) => (prevAngle + rotationSpeed * deltaTime) % (2 * Math.PI));

      // Apply 3D transformations
      context.save();
      context.translate(canvasWidth / 2, canvasHeight / 2);
      context.rotate(rotationX);

      // Draw the smaller image
      context.drawImage(
        backgroundImage,
        -backgroundImage.width * imageScale / 2,
        -backgroundImage.height * imageScale / 2,
        backgroundImage.width * imageScale,
        backgroundImage.height * imageScale
      );

      context.restore();

      // Request the next animation frame
      requestAnimationFrame(animateImage);
    };

    // Load image and start animation
    backgroundImage.onload = () => {
      animateImage(0);
    };
  }, [canvasWidth, canvasHeight, rotationX]);

  // Update canvas dimensions on window resize
  const handleResize = () => {
    setCanvasWidth(window.innerWidth * 0.45);
    setCanvasHeight(window.innerHeight * 0.75);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={{ background: "transparent", position: "absolute", top: 0, right: 0 }}
      />
      {props.children}
    </div>
  );
}
