import './CreateButton.css'
import { useSnapshot } from "valtio";
import axios from "axios";

import state from "../../../../store";
import { BASE_URL } from "config/constants";
import { getContrastingColor } from 'config/helpers';


const CreateButton = ({ canvasRef, rotateToBack }) => {
  const snap = useSnapshot(state);
  const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJlZGkubW5zKzNkQGdtYWlsLmNvbSIsInN1YiI6IjY0NmY5ZDI0ZDA2YzE2Mzc5MTE4OWFlZiIsInJvbGUiOiJQUk9EVUNFUiIsInN0YXR1cyI6Ik5FVyIsImlhdCI6MTY4NTAzNjQzNiwiZXhwIjoxNjg1NjQxMjM2fQ.FU_RsSC36hgyz8VDdiC1dvYaq7Ef34RzypOBjcppeKg"

  function dataURLtoBlob(dataURL) {
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeString });
  }

  const uploadMock = async (screenshotDataURL) => {
    /// const screenshotDataURL = canvasRef.current.toDataURL("image/png");
    const blob = dataURLtoBlob(screenshotDataURL);
    const filex = new File([blob], "image.png", { type: "image/png" });

    const formData = new FormData();
    formData.append("image", filex);

    return await axios
      .post("https://cdn.droplinked.com/upload", formData)
      .then((e) => {
        return e.data.original;
      })
      .catch((e) => {
        return false;
      });
  };

  const callProdcutApi = async (frontMock, backMock, mockResult) => {
    const requestBody = {
      title: "test",
      description: "test",
      priceUnit: "USD",
      productCollectionID: "646f9d24d06c163791189af3",
      media: [
        {
          isMain: true,
          url: frontMock,
        },
        {
            isMain: false,
            url: backMock,
          },
      ],
      artwork: mockResult,
    };

    const response = await axios.put(
      `${BASE_URL}/product/64733e339134f027bc2923b8`,
      requestBody,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log('response ', response);
  };

  const clickOnCreate = async () => {
    const frontMock = await uploadMock(
      canvasRef.current.toDataURL("image/png")
    );
    rotateToBack();
    const mockResult = await uploadMock(snap.logoDecal);
    const backMock = await uploadMock(canvasRef.current.toDataURL("image/png"));

    await callProdcutApi(frontMock, backMock, mockResult);
  };

  return (
    <button
      className="createApi"
      style={{ 
        backgroundColor: snap.color.value, 
        color: getContrastingColor(snap.color.value) 
      }}
      onClick={clickOnCreate}
    >
      Create
    </button>
  );
};

export default CreateButton;
