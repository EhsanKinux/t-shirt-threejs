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
    fetchModels('6474a7a09dd9e4b229eb4842');
  }, []);


  const fetchModels = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/pod/${id}`);
      setSelectedModel(response.data[0]);
      console.log(response.data);
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
