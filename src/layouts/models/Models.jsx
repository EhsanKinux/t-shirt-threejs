import React, { useEffect, useState } from "react";
import axios from "axios";

import { BASE_URL } from "config/constants";
import Shirt from "components/shirt/Shirt";

const Models = ({
  angle,
  setIsAnimating,
  isAnimating,
  canvasRef,
  showFront,
  decalRef,
}) => {
  const [selectedModel, setSelectedModel] = useState(null);

  useEffect(() => {
    fetchModels();
  }, []);


  const fetchModels = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/3d`);
      setSelectedModel(response.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



  return (
    <>
      {(selectedModel !== null) && (
        <Shirt
          angle={angle}
          setIsAnimating={setIsAnimating}
          isAnimating={isAnimating}
          canvasRef={canvasRef}
          showFront={showFront}
          setLogoPosition
          decalRef={decalRef}
          modelURl={selectedModel?.url}
        />
      )}
    </>
  );
};

export default Models;