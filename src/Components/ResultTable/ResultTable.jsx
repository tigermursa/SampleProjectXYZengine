import React, { useRef } from "react";
import { useSpring, useTrail, animated, config } from "react-spring";
import jsPDF from "jspdf";
import "./ResultTable.css";

const ResultTable = () => {
  const values = {
    "Project Name": localStorage.getItem("projectName"),
    "Project Description": localStorage.getItem("projectDescription"),
    Client: localStorage.getItem("client"),
    Contractor: localStorage.getItem("contractor"),
    max_X: localStorage.getItem("maxX"),
    min_X: localStorage.getItem("minX"),
    max_Y: localStorage.getItem("maxY"),
    min_Y: localStorage.getItem("minY"),
    max_Z: localStorage.getItem("maxZ"),
    min_Z: localStorage.getItem("minZ"),
  };

  const fadeInProps = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(20px)" },
    config: config.stiff,
  });

  const trailProps = useTrail(10, {
    opacity: 1,
    transform: "translateX(0)",
    from: { opacity: 0, transform: "translateX(-20px)" },
    config: config.wobbly,
  });

  const labels = [
    "Project Name",
    "Project Description",
    "Client",
    "Contractor",
    "max_X",
    "min_X",
    "max_Y",
    "min_Y",
    "max_Z",
    "min_Z",
  ];

  const pdfRef = useRef(null);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Results Table", 10, 10);

    let yPos = 20;
    labels.forEach((label, index) => {
      const value = values[label] || "No Data"; // Display "No Data" if value is missing
      doc.text(`${label}: ${value}`, 10, yPos);
      yPos += 10;
    });

    doc.save("results.pdf");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {/* React spring animation here */}
      <animated.div
        className="bg-white p-8 shadow-2xl shadow-black w-full md:w-2/3 lg:w-1/2 xl:w-1/3 rounded-3xl"
        style={fadeInProps}
      >
        <h2 className="text-xl font-semibold mb-4">Results</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 font-semibold text-left border">
                  Label
                </th>
                <th className="py-2 px-4 font-semibold text-left border">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {labels.map((label, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-300"
                  style={trailProps[index]}
                >
                  <td className="py-2 px-4 border">{label}</td>
                  <td className="py-2 px-4 overflow-hidden border">
                    {values[label] || "No Data"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Download button here */}
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded mt-9"
          onClick={handleDownloadPDF}
        >
          Download PDF
        </button>
      </animated.div>
    </div>
  );
};

export default ResultTable;
