import Machine from "./page";
import React from "react";

const detailObj = [
  {
    image: "/machine-image.jpg",
    dropDetails: {
      code: "R4ND0M",
      DateOfInstallation: "03-jul-2023",
      NominalPower: "50",
      NumberOfUnits: "7",
      code1: "RaND0M",
      DateOfInstallation1: "03-jul-2023",
      NominalPower1: "50",
      NumberOfUnits1: "7",
    },
  },
];

const Details = ({ width, height }) => {
  console.log("image", detailObj[0].image);
  const scale = Math.min(width / 1024, height / 1024);
  return (
    <div style={{ transform: `scale(${scale > 1 ? 1 : scale})` }}>
      {detailObj.map((item, index) => (
        <Machine key={index} imgSrc={item.image} drop={item.dropDetails} />
      ))}
    </div>
  );
};

export default Details;
