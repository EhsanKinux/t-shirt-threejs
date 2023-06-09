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
    fetchModels('647788018ab33f75a08597d0');
  }, []);


  const fetchModels = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/pod/product/${id}`);
      setSelectedModel(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



  return (
    <>
      {(selectedModel !== null) && selectedModel.graphic_url && (
        <Shirt
          angle={angle}
          setIsAnimating={setIsAnimating}
          isAnimating={isAnimating}
          canvasRef={canvasRef}
          showFront={showFront}
          setLogoPosition
          decalRef={decalRef}
          modelURl={selectedModel.graphic_url}
        />
      )}
    </>
  );
};

export default Models;
