import React from "react";

function Element({ number, name, blank, background }) {
  return (
    <div
      className={`tc pa1 element ${blank ? "blank" : ""}`}
      style={{ backgroundImage: background }}
    >
      <div className="f7">{number}</div>
      <h2 className="pv2 f3">{name}</h2>
    </div>
  );
}

export default Element;
