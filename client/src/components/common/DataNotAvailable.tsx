import React from "react";

export const DataNotAvailable = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100 p-10">
      <div className="p-6 bg-red-100 border border-red-300 text-red-700 rounded-lg shadow">
        <p className="text-lg font-semibold">Data Not Available</p>
      </div>
    </div>
  );
};

 
