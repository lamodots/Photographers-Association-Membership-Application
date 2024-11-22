import React from "react";
import chart from "../../../assets/chart.png";

function Chart() {
  return (
    <div>
      <h3>MEMBER DEMOGRAPHY</h3>
      <p>
        <span>Male</span> / Female
      </p>
      <div>
        <img src={chart} />
      </div>
    </div>
  );
}

export default Chart;
