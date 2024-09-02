import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchErrors, resolveError } from "../redux/errorSlice";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,

  LineElement,
  Title,
  Tooltip,
  Legend
);

const ErrorManagement = () => {
  const dispatch = useDispatch();
  const { loading, errors, currentPage, totalPages, errorMsg } = useSelector(
    (state) => state.errors
  );

  const [selectedErrorId, setSelectedErrorId] = useState("");
  useEffect(() => {
    dispatch(fetchErrors(currentPage));
  }, [currentPage]);

  const handleResolve = (id) => {
    dispatch(resolveError(id));
    setSelectedErrorId("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedErrorId) {
      handleResolve(selectedErrorId);
    }
  };

  // Process data for the chart
  const chartData = errors.reduce((acc, error) => {
    const date = new Date(error.timestamp || Date.now()).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  // Create an array of all dates between the start and end dates
  const startDate = new Date(
    Math.min(...Object.keys(chartData).map((date) => new Date(date)))
  );
  const endDate = new Date(Math.max(...Object.keys(chartData)));
  let currentDate = startDate;

  while (currentDate <= endDate) {
    const formattedDate = currentDate.toLocaleDateString();
    if (!chartData[formattedDate]) {
      chartData[formattedDate] = 0; // Ensure every date has a value, even if it's 0
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const labels = Object.keys(chartData);
  const data = Object.values(chartData);
  //  console.log(chartData,"ki", labels, data);
  const lineChartData = {
    labels,
    datasets: [
      {
        label: "Error vs Day",
        data,
        fill: false,
        backgroundColor: "rgba(29, 78, 216, 0.2)", // Blue color
        borderColor: "rgba(29, 78, 216, 1)", // Blue color
        borderWidth: 2,
        spanGaps: true,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          stepSize: 1, // Step size between ticks
          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
        },
        beginAtZero: true, // Start y-axis at zero
      },
    },
  };

  const renderErrors = () => {
    if (loading)
      return <p className=" text-lg text-green-500">Loading errors...</p>;
    if (errors.length === 0)
      return <p className=" text-lg text-red-600 ">No errors found.</p>;

    return (
      <table className="min-w-full mt-4 bg-white dark:bg-[#0d0d0d] text-black dark:text-white  border border-gray-200 rounded-lg shadow-md">
        <thead className="">
          <tr className="text-left border-b border-gray-200">
            <th className="py-2 px-4 text-sm font-semibold ">ERROR_ID</th>
            <th className="py-2 px-4 text-sm font-semibold ">Name</th>
            <th className="py-2 px-4 text-sm font-semibold ">Message</th>
            <th className="py-2 px-4 text-sm font-semibold ">Code</th>
            <th className="py-2 px-4 text-sm font-semibold ">Status</th>
            <th className="py-2 px-4 text-sm font-semibold ">Date</th>
            <th className="py-2 px-4 text-sm font-semibold ">Time</th>
            <th className="py-2 px-4 text-sm font-semibold ">Platform</th>
            <th className="py-2 px-4 text-sm font-semibold ">Path</th>
            <th className="py-2 px-4 text-sm font-semibold ">User_ID</th>
            <th className="py-2 px-4 text-sm font-semibold ">UserName</th>
            <th className="py-2 px-4 text-sm font-semibold ">FullName</th>
          </tr>
        </thead>
        {/* <tbody>
          {errors &&
            errors?.length > 0 &&
            errors
              ?.sort((a, b) => {
                if (Number(a.code) >= 500 && Number(b.code) < 500) {
                  return -1; // a should come before b
                } else if (
                  Number(a.code) < 500 &&
                  Number(b.code) >= Number(500)
                ) {
                  return 1; // b should come before a
                } else {
                  return Number(a.code) - Number(b.code); // sort the remaining errors by their code
                }
              })
              .map((error) => {
                const errorDate = new Date(error.timestamp || Date.now());
                const formattedDate = errorDate.toLocaleDateString();
                const formattedTime = errorDate.toLocaleTimeString();

                return (
                  <tr key={error._id} className="border-b border-gray-200">
                    <td className="py-2 px-4 text-sm text-gray-800">
                      {error._id || "N/A"}
                    </td>
                    <td className="py-2 px-4 text-sm text-gray-800">
                      {error.name || "N/A"}
                    </td>
                    <td className="py-2 px-4 text-sm text-gray-800">
                      {error.message.slice(0, 10) || "N/A"}
                    </td>
                    <td className="py-2 px-4 text-sm text-gray-800">
                      {error.code || "N/A"}
                    </td>
                    <td className="py-2 px-4 text-sm text-gray-800">
                      {error.resolved ? (
                        <span className="text-green-600">Resolved</span>
                      ) : (
                        <span className="text-red-600">Pending</span>
                      )}
                    </td>
                    <td className="py-2 px-4 text-sm text-gray-800">
                      {formattedDate}
                    </td>
                    <td className="py-2 px-4 text-sm text-gray-800">
                      {formattedTime}
                    </td>
                    <td className="py-2 px-4 text-sm text-gray-800">
                      {error.platform || "N/A"}
                    </td>
                    <td className="py-2 px-4 text-sm text-gray-800">
                      {error.path || "N/A"}
                    </td>
                    <td className="py-2 px-4 text-sm text-gray-800">
                      {error.userId || "N/A"}
                    </td>
                    <td className="py-2 px-4 text-sm text-gray-800">
                      {error.username || "N/A"}
                    </td>
                    <td className="py-2 px-4 text-sm text-gray-800">
                      {error.fullName || "N/A"}
                    </td>
                  </tr>
                );
              })}
        </tbody> */}

        <tbody>
          {errors &&
            errors.length > 0 &&
            [...errors] // Create a shallow copy of the errors array
              .sort((a, b) => {
                if (Number(a.code) >= 500 && Number(b.code) < 500) {
                  return -1; // a should come before b
                } else if (Number(a.code) < 500 && Number(b.code) >= 500) {
                  return 1; // b should come before a
                } else {
                  return Number(a.code) - Number(b.code); // sort the remaining errors by their code
                }
              })
              .map((error) => {
                const errorDate = new Date(error.timestamp || Date.now());
                const formattedDate = errorDate.toLocaleDateString();
                const formattedTime = errorDate.toLocaleTimeString();

                return (
                  <tr key={error._id} className="border-b border-gray-200">
                    <td className="py-2 px-4 text-sm ">{error._id || "N/A"}</td>
                    <td className="py-2 px-4 text-sm ">
                      {error.name || "N/A"}
                    </td>
                    <td className="py-2 px-4 text-sm ">
                      {error.message.slice(0, 10) || "N/A"}
                    </td>
                    <td className="py-2 px-4 text-sm ">
                      {error.code || "N/A"}
                    </td>
                    <td className="py-2 px-4 text-sm ">
                      {error.resolved ? (
                        <span className="text-green-600">Resolved</span>
                      ) : (
                        <span className="text-red-600">Pending</span>
                      )}
                    </td>
                    <td className="py-2 px-4 text-sm ">{formattedDate}</td>
                    <td className="py-2 px-4 text-sm ">{formattedTime}</td>
                    <td className="py-2 px-4 text-sm ">
                      {error.platform || "N/A"}
                    </td>
                    <td className="py-2 px-4 text-sm ">
                      {error.path || "N/A"}
                    </td>
                    <td className="py-2 px-4 text-sm ">
                      {error.userId || "N/A"}
                    </td>
                    <td className="py-2 px-4 text-sm ">
                      {error.username || "N/A"}
                    </td>
                    <td className="py-2 px-4 text-sm ">
                      {error.fullName || "N/A"}
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    );
  };

  return (
    <div className="flex flex-col p-4">
      {/* Left side: Chart and Table */}
      <div className=" lg:pr-4">
        <h2 className="text-2xl text-center font-bold mb-4">Error Logs</h2>
        <div className="mb-2 border-2 border-white w-full">
          <Line data={lineChartData} options={options} />
        </div>
        <div className="overflow-x-auto">{renderErrors()}</div>
      </div>

      {/* Right side: Form to resolve errors */}
      <div className="lg:w-1/6 lg:pl-4">
        <h2 className="text-2xl font-bold mb-4">Resolve Error</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="errorId" className="block text-sm font-medium ">
              Error ID:
            </label>
            <input
              type="text"
              id="errorId"
              value={selectedErrorId}
              onChange={(e) => setSelectedErrorId(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Error ID"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
          >
            Resolve Error
          </button>
        </form>
        {errorMsg && <p className="text-red-600 mt-4">{errorMsg}</p>}
      </div>
    </div>
  );
};

export default ErrorManagement;
