import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import moment from "moment";

function FruitTable({ fruits, handleDeleteFruit, handleEditFruit }) {
  // Sort fruits by fruit_id in ascending order
  const sortedFruits = [...fruits].sort((a, b) => a.fruit_id - b.fruit_id);

  return (
    <table className="w-full overflow-hidden border-collapse rounded-lg table-auto">
      <thead>
        <tr className="bg-gray-100 dark:bg-gray-800">
          <th className="p-4 text-left text-gray-800 dark:text-white">ID</th>
          <th className="p-4 text-left text-gray-800 dark:text-white">
            Fruit Name
          </th>
          <th className="p-4 text-left text-gray-800 dark:text-white">
            Quantity
          </th>
          <th className="p-4 text-left text-gray-800 dark:text-white">
            Created At
          </th>
          <th className="p-4 text-left text-gray-800 dark:text-white">
            Updated At
          </th>
          <th className="p-4 text-left text-gray-800 dark:text-white">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedFruits.map((fruit) => (
          <tr
            key={fruit.fruit_id}
            className="border-b border-gray-200 dark:border-gray-700"
          >
            <td className="p-4 text-gray-800 dark:text-white">
              {fruit.fruit_id}
            </td>
            <td className="p-4 text-gray-800 dark:text-white">
              {fruit.fruit_name}
            </td>
            <td className="p-4 text-gray-800 dark:text-white">
              {fruit.quantity}
            </td>
            <td className="p-4 text-gray-800 dark:text-white">
              {moment(fruit.created_at).format("lll")}
            </td>
            <td className="p-4 text-gray-800 dark:text-white">
              {moment(fruit.updated_at).format("lll")}
            </td>
            <td className="p-4">
              <button
                onClick={() => handleEditFruit(fruit)}
                className="p-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                <FiEdit />
              </button>
              <button
                onClick={() => handleDeleteFruit(fruit.fruit_id)}
                className="p-2 text-white bg-red-500 rounded hover:bg-red-600"
              >
                <FiTrash2 />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FruitTable;
