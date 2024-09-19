import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

function FruitTable({ fruits, handleDeleteFruit }) {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    // Parse the date string
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) return "Invalid Date";

    // Convert to UTC+8
    const utc8Date = new Date(date.getTime() + 8 * 60 * 60 * 1000);

    // Format the date
    return (
      utc8Date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "UTC",
        hour12: false,
      }) + " (UTC+8)"
    );
  };

  

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              ID
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Name
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Quantity
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Created At
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Updated At
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {fruits.map((fruit) => (
            <tr key={fruit.fruit_id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">{fruit.fruit_id}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {fruit.fruit_name.charAt(0).toUpperCase() +
                  fruit.fruit_name.slice(1)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {fruit.quantity} pc(s)
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {formatDate(fruit.created_at)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {formatDate(fruit.updated_at)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="mr-3 text-blue-600 hover:text-blue-900">
                  <FiEdit className="inline" />
                </button>
                <button
                  className="text-red-600 hover:text-red-900"
                  onClick={() => handleDeleteFruit(fruit.fruit_id)}
                >
                  <FiTrash2 className="inline" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FruitTable;
