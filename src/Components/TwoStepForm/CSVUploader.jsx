import React from "react";
import Papa from "papaparse";
// papaparse for the operation..............
const CSVUploader = ({ onCSVUpload }) => {
  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const csvContent = e.target.result;
      Papa.parse(csvContent, {
        complete: (result) => {
          const data = result.data;
          onCSVUpload(data);
        },
        header: false,
      });
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <label>CSV File Upload:</label>
      <input type="file" accept=".csv" onChange={handleCSVUpload} />
    </div>
  );
};

export default CSVUploader;
