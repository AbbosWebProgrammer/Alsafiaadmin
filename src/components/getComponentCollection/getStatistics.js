import React from "react";
import { Line } from "react-chartjs-2";

function GetStatistic() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Buyurtma qabul qilindi",
        data: [33, 53, 60, 41, 44, 65],
        fill: true,
        backgroundColor: "#ffc10742",
        borderColor: "#ffc107"
      },
      {
        label: "Buyurtma jo'natildi",
        data: [33, 25, 35, 51, 54, 76],
        fill: true,
        backgroundColor: "#0dcaf02e",
        borderColor: "#0dcaf0"
      },
      {
        label: "Buyurtma yetkazildi",
        data: [25, 28, 40, 46, 54, 50],
        fill: true,
        backgroundColor: "#19875454",
        borderColor: "#198754"
      },
      {
        label: "Buyurtma bekor qilindi",
        data: [5, 8, 10, 16, 14, 10],
        fill: true,
        backgroundColor: "#dc354545",
        borderColor: "#dc3545"
      }
    ]
  };
  
  const legend = {
    display: true,
    position: "bottom",
    labels: {
      fontColor: "#323130",
      fontSize: 14
    }
  };
  
  const options = {
    title: {
      display: true,
      text: "STATISTICS"
    },
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 0,
            suggestedMax: 100
          }
        }
      ]
    }
  };
    return (
            <div className="mt-5">
                <Line data={data} legend={legend} options={options} />
            </div>
      );
}

export default GetStatistic;