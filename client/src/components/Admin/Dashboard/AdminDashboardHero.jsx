import React, { useState } from "react";
import { dummyProperties } from "../../../utils/dummyData/CrudData.js";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "../../UI/Button.jsx";
import DashboardHeader from "./DashboardHeader.jsx";

const AdminDashboardHero = ({ activeTab }) => {
  const [properties, setProperties] = useState(dummyProperties);
  const [form, setForm] = useState({
    id: "",
    name: "",
    city: "",
    country: "",
    type: "",
    image: "",
    description: "",
    price: "",
  });

  // --- CREATE ---
  const handleAdd = () => {
    if (!form.name) return alert("Enter property name");
    const newProp = { ...form, id: Date.now() };
    setProperties([...properties, newProp]);
    setForm({
      id: "",
      name: "",
      city: "",
      country: "",
      type: "",
      image: "",
      description: "",
      price: "",
    });
  };

  // --- DELETE ---
  const handleDelete = (id) => {
    const newList = properties.filter((p) => p.id !== id);
    setProperties(newList);
  };

  // --- EDIT ---
  const handleEdit = (id) => {
    const prop = properties.find((p) => p.id === id);
    if (prop) setForm(prop);
  };

  // --- UPDATE ---
  const handleUpdate = () => {
    const updatedList = properties.map((p) => (p.id === form.id ? form : p));
    setProperties(updatedList);
    setForm({
      id: "",
      name: "",
      city: "",
      country: "",
      type: "",
      image: "",
      description: "",
      price: "",
    });
  };

  return (
    <main className="flex-1 bg-gray-50 min-h-screen">
      <DashboardHeader />

      <div className="px-4 sm:px-6 pt-24 pb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white shadow-md rounded-2xl px-4 sm:px-6 py-4 mb-6 gap-3 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            🏠 Admin Dashboard
          </h1>
        </div>

        {/* --- VIEW TAB: Table --- */}
        {activeTab === "view" && (
          <div className="overflow-x-auto bg-white p-4 rounded-xl shadow-md">
            <table className="min-w-full text-sm sm:text-base">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-3 sm:px-4 py-2">ID</th>
                  <th className="px-3 sm:px-4 py-2">Name</th>
                  <th className="px-3 sm:px-4 py-2">City</th>
                  <th className="px-3 sm:px-4 py-2">Type</th>
                  <th className="px-3 sm:px-4 py-2">Price</th>
                  <th className="px-3 sm:px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((prop) => (
                  <tr
                    key={prop.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-3 sm:px-4 py-2">{prop.id}</td>
                    <td className="px-3 sm:px-4 py-2">{prop.name}</td>
                    <td className="px-3 sm:px-4 py-2">{prop.city}</td>
                    <td className="px-3 sm:px-4 py-2">{prop.type}</td>
                    <td className="px-3 sm:px-4 py-2">{prop.price}</td>
                    <td className="px-3 sm:px-4 py-2 flex gap-3">
                      <button
                        onClick={() => handleEdit(prop.id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(prop.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* --- ADD TAB --- */}
        {activeTab === "add" && (
          <div className="bg-white p-5 sm:p-6 rounded-xl shadow-md w-full max-w-xl mx-auto">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Add New Property
            </h2>
            {["name", "city", "country", "price", "image"].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="border p-2 rounded w-full mb-2 text-sm sm:text-base"
              />
            ))}
            <button
              onClick={handleAdd}
              className="bg-[#7FC68A] w-full sm:w-auto text-white px-4 py-2 rounded-lg"
            >
              Add Property
            </button>
          </div>
        )}

        {/* --- EDIT TAB --- */}
        {activeTab === "edit" && (
          <div className="bg-white p-5 sm:p-6 rounded-xl shadow-md w-full max-w-xl mx-auto">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Edit Property
            </h2>
            <input
              type="text"
              placeholder="Enter ID to Fetch"
              value={form.id}
              onChange={(e) => setForm({ ...form, id: Number(e.target.value) })}
              className="border p-2 rounded w-full mb-3 text-sm sm:text-base"
            />
            <button
              onClick={() => handleEdit(Number(form.id))}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 w-full sm:w-auto"
            >
              Fetch Property
            </button>
            {["name", "description", "city", "country", "type", "price"].map(
              (field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={form[field]}
                  onChange={(e) =>
                    setForm({ ...form, [field]: e.target.value })
                  }
                  className="border p-2 rounded w-full mb-2 text-sm sm:text-base"
                />
              )
            )}
            <button
              onClick={handleUpdate}
              className="bg-[#7FC68A] text-white px-4 py-2 rounded-lg w-full sm:w-auto"
            >
              Update Property
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminDashboardHero;
