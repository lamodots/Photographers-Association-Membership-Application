import React from "react";
import chart from "../../../assets/chart.png";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJs, Tooltip, Legend, ArcElement } from "chart.js";
import { Suspense } from "react";
ChartJs.register(Tooltip, Legend, ArcElement);
function Chart() {
  const data = {
    datasets: [
      {
        backgroundColor: ["rgb(255,174,128)", "#CFDAE8"],

        data: [600, 400],
        weight: 40,
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [],
  };

  const options = { radius: "80%" };

  return (
    <div>
      <h3 className="text-xs uppercase text-center text-[#1A4F83] font-bold">
        MEMBER DEMOGRAPHY
      </h3>
      <p className="text-xs  text-center text-[#1A4F83] mt-2 ">
        <span className="text-[#FFAE80] font-bold text-[18px]">Male</span> /
        Female
      </p>
      <div className="flex justify-center mt-10 w-full">
        {/* <img src={chart} /> */}
        <Doughnut options={options} data={data} />
      </div>
    </div>
  );
}

export default Chart;
