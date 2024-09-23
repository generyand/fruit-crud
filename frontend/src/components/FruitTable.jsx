import React from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import moment from "moment";

function FruitTable({ fruits, handleDeleteFruit, handleEditFruit }) {
  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
        <tr>
          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
            ID
          </th>
          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
            Name
          </th>
          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
            Quantity
          </th>
          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
            Created At
          </th>
          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
            Edited At
          </th>
          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
        {fruits.map((fruit) => (
          <tr key={fruit.fruit_id}>
            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-gray-200">
              {fruit.fruit_id}
            </td>
            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-gray-200">
              {fruit.fruit_name}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-300">
              {fruit.quantity}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-300">
              {moment(fruit.created_at).format("lll")}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-300">
              {moment(fruit.edited_at).format("lll")}
            </td>
            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
              <button
                onClick={() => handleEditFruit(fruit)}
                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-600"
              >
                <FiEdit />
              </button>
              <button
                onClick={() => handleDeleteFruit(fruit)}
                className="ml-4 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600"
              >
                <FiTrash />
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
