import React from "react";

const PostLoading = ({ progress, isComplete }) => {
  return (
    <div className="bg-white dark:bg-[#273142] dark:text-white p-6 rounded-lg shadow-lg w-80 text-center">
      <h2 className="text-lg font-semibold mb-4">Uploading...</h2>
      <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
        <div
          className={`h-4 rounded-full transition-all duration-300 ${
            progress === 100 ? "bg-blue-500" : "bg-green-500"
          }`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {progress === 100 && !isComplete ? (
        <p className="dark:text-white  text-sm text-gray-700">
          Please wait, it may take a few minutes more...
        </p>
      ) : (
        <p className="text-gray-700">{progress}% uploaded</p>
      )}
    </div>
  );
};

export default PostLoading;
