import React from "react";

function Date({ number, time }) {
  return (
    <div className="container-availability">
      <div className="date-number">{number}</div>
      <div className="date-letters">{time}</div>
    </div>
  );
}

export default Date;
