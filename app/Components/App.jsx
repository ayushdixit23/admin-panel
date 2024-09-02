// src/App.jsx
// eslint-disable-next-line no-unused-vars
"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchErrors } from "../redux/errorSlice"; // Adjust this import based on your file structure
import ErrorManagement from "../Components/Eror.jsx";
function App() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { errors } = useSelector((state) => state.errors); // Adjust based on your Redux state structure
  useEffect(() => {
    dispatch(fetchErrors(page)); // Fetch errors on component mount
  }, [dispatch, page]);

  const nextPage = () => {
    setPage((prevPage) => {
      if (errors.length > 0)
        return prevPage + 1; //   Increment page number and return the new state
      else return prevPage;
    });
  };

  const prevPage = () => {
    setPage((prevPage) => {
      return prevPage > 1 ? prevPage - 1 : prevPage; // Decrement page number and return the new state, ensuring it doesn’t go below 1
    });
  };

  return (
    <>
      <ErrorManagement />
      <div className={`flex justify-between items-center pb-3 px-3 `}>
        <button
          onClick={prevPage}
          className=" p-2 border rounded shadow-md hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          Prev {`(${page})`}
        </button>

        <button
          onClick={nextPage}
          className=" p-2 border rounded shadow-md hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          Next {`(${page})`}
        </button>
      </div>
    </>
  );
}

export default App;
