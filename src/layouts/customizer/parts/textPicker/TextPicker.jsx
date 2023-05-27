import React from "react";
import state from "store";
import "./textpicker.css";
//
import { getContrastingColor } from "config/helpers";
import { useSnapshot } from "valtio";

const TextPicker = () => {
  const snap = useSnapshot(state);
  const handleTextChange = (event) => {
    state.textValue = event.target.value;
  };
  return (
    <div className="wrapper">
      <label
        htmlFor="text-input"
        className="textLabel"
        style={{
          color: getContrastingColor(snap.color.value),
          backgroundColor: snap.color.value,
        }}
      >
        Enter Your Text:
      </label>
      <input
        id="text-input"
        type="text"
        onChange={handleTextChange}
        className="inputText"
      />
    </div>
  );
};

export default TextPicker;
