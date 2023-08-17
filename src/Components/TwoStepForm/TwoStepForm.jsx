import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CSVUploader from "./CSVUploader";
import Papa from "papaparse";
import Swal from "sweetalert2";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";
const TwoStepForm = () => {
  const [maxX, setMaxX] = useState(null);
  const [minX, setMinX] = useState(null);
  const [maxY, setMaxY] = useState(null);
  const [minY, setMinY] = useState(null);
  const [maxZ, setMaxZ] = useState(null);
  const [minZ, setMinZ] = useState(null);
  const { register, handleSubmit, watch } = useForm();
  const [currentStep, setCurrentStep] = useState(1);
  const [csvData, setCsvData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showChart, setShowChart] = useState(false);

  const onNextStep = async () => {
    setIsLoading(true);

    const formData = watch();

    // Storing local storage..................................................
    localStorage.setItem("projectName", formData.projectName);
    localStorage.setItem("projectDescription", formData.projectDescription);
    localStorage.setItem("client", formData.client);
    localStorage.setItem("contractor", formData.contractor);

    setIsLoading(false);
    setCurrentStep(currentStep + 1);
  };

  const onSubmit = (data) => {
    console.log(data);
    Swal.fire({
      icon: "success",
      title: "Data Submitted!",
      text: "Your data has been successfully submitted.",
    });
  };
  // CSV uploaded values handler ......................
  const handleCSVUpload = (data) => {
    setCsvData(data);
    localStorage.setItem("csvData", JSON.stringify(data));
    // X Y Z values
    const xValues = data
      .slice(1)
      .map((row) => parseFloat(row[1]))
      .filter((value) => !isNaN(value));
    const yValues = data
      .slice(1)
      .map((row) => parseFloat(row[2]))
      .filter((value) => !isNaN(value));
    const zValues = data
      .slice(1)
      .map((row) => parseFloat(row[3]))
      .filter((value) => !isNaN(value));

    const maxXValue = Math.max(...xValues);
    const minXValue = Math.min(...xValues);
    const maxYValue = Math.max(...yValues);
    const minYValue = Math.min(...yValues);
    const maxZValue = Math.max(...zValues);
    const minZValue = Math.min(...zValues);

    setMaxX(maxXValue);
    setMinX(minXValue);
    setMaxY(maxYValue);
    setMinY(minYValue);
    setMaxZ(maxZValue);
    setMinZ(minZValue);

    localStorage.setItem("maxX", maxXValue);
    localStorage.setItem("minX", minXValue);
    localStorage.setItem("maxY", maxYValue);
    localStorage.setItem("minY", minYValue);
    localStorage.setItem("maxZ", maxZValue);
    localStorage.setItem("minZ", minZValue);

    const KP = data[0][0];
    const X = data[0][1];
    const Y = data[0][2];
    const Z = data[0][3];

    localStorage.setItem("KP", KP);
    localStorage.setItem("X", X);
    localStorage.setItem("Y", Y);
    localStorage.setItem("Z", Z);
    setShowChart(true);
  };

  useEffect(() => {
    const savedCsvData = localStorage.getItem("csvData");
    if (savedCsvData) {
      setCsvData(JSON.parse(savedCsvData));
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 shadow-2xl shadow-black w-96 rounded-3xl text-start font-semibold">
        {/* form title */}
        {currentStep == 1 && (
          <h1 className="text-2xl font-semibold mb-4">Step 1</h1>
        )}
        {currentStep == 2 && (
          <h1 className="text-2xl font-semibold mb-4">Step 2 </h1>
        )}

        <ul className="steps">
          <li className={`step ${currentStep === 1 ? "step-primary" : ""}`}>
            Input Information
          </li>
          <li className={`step ${currentStep === 2 ? "step-primary" : ""}`}>
            Review Information
          </li>
        </ul>
        {currentStep === 1 && (
          <form onSubmit={handleSubmit(onNextStep)}>
            <label className="block mb-2">Project Name:</label>
            <input
              className="w-full border p-2 rounded mb-2"
              type="text"
              required
              {...register("projectName")}
            />
            <label className="block mb-2">Project Description:</label>
            <input
              className="w-full border p-2 rounded mb-2"
              type="text"
              {...register("projectDescription")}
              required
            />
            <label className="block mb-2">Client:</label>
            <input
              className="w-full border p-2 rounded mb-2"
              type="text"
              {...register("client")}
              required
            />
            <label className="block mb-2">Contractor:</label>
            <input
              className="w-full border p-2 rounded mb-2"
              type="text"
              {...register("contractor")}
              required
            />

            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
              type="submit"
              disabled={isLoading}
            >
              Next
            </button>
            {isLoading && <div className="loader"></div>}
          </form>
        )}
        {/* step 2 form starts from here */}
        {currentStep === 2 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block mb-2">Project Name:</label>
            <input
              className="w-full border p-2 rounded mb-2"
              type="text"
              value={watch("projectName")}
              readOnly
            />
            <label className="block mb-2">Project Description:</label>
            <input
              className="w-full border p-2 rounded mb-2"
              type="text"
              value={watch("projectDescription")}
              readOnly
            />
            <label className="block mb-2">Client:</label>
            <input
              className="w-full border p-2 rounded mb-2"
              type="text"
              value={watch("client")}
              readOnly
            />
            <label className="block mb-2">Contractor:</label>
            <input
              className="w-full border p-2 rounded mb-2"
              type="text"
              value={watch("contractor")}
              readOnly
            />
            {/* The CSV UPLOADER COMPONENT HERE */}
            <CSVUploader onCSVUpload={handleCSVUpload} />
            <label className="block mb-2">max_X:</label>
            <input
              className="w-full border p-2 rounded mb-2"
              type="number"
              defaultValue={maxX !== null ? maxX : ""}
              required
            />
            <label className="block mb-2">min_X:</label>
            <input
              className="w-full border p-2 rounded mb-2"
              type="number"
              defaultValue={minX !== null ? minX : ""}
              required
            />
            <label className="block mb-2">max_Y:</label>
            <input
              className="w-full border p-2 rounded mb-2"
              type="number"
              defaultValue={maxY !== null ? maxY : ""}
              required
            />
            <label className="block mb-2">min_Y:</label>
            <input
              className="w-full border p-2 rounded mb-2"
              type="number"
              defaultValue={minY !== null ? minY : ""}
              required
            />
            <label className="block mb-2">max_Z:</label>
            <input
              className="w-full border p-2 rounded mb-2"
              type="number"
              defaultValue={maxZ !== null ? maxZ : ""}
              required
            />
            <label className="block mb-2">min_Z:</label>
            <input
              className="w-full border p-2 rounded mb-2"
              type="number"
              defaultValue={minZ !== null ? minZ : ""}
              required
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
              type="submit"
            >
              Submit
            </button>
          </form>
        )}
        {/* Chart code here for step 2 */}
        {showChart && currentStep === 2 && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">The Chart</h2>
            <div className="w-full">
              <BarChart
                width={300}
                height={300}
                data={csvData.slice(1)}
                margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="0" // "KP" values here......
                  label={{ value: "KP", position: "insideBottom", offset: -10 }}
                />
                <YAxis
                  domain={["auto", "auto"]}
                  label={{ value: "", angle: -90, position: "insideLeft" }}
                />
                <Tooltip />
                <Legend />

                <Bar
                  dataKey="1" // "X" values here ....
                  fill="#8884d8"
                  name="X Values"
                />
              </BarChart>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TwoStepForm;
