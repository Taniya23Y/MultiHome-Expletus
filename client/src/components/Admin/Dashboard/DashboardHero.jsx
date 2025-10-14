import React, { useState } from "react";
import { dummyProperties } from "../../../utils/dummyData/CrudData.js";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "../../UI/Button.jsx";

const DashboardHero = ({ activeTab }) => {
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
    const newList = [];
    for (let i = 0; properties[i] !== undefined; i++) {
      if (properties[i].id !== id) newList[newList.length] = properties[i];
    }
    setProperties(newList);
  };

  // --- EDIT ---
  const handleEdit = (id) => {
    for (let i = 0; properties[i] !== undefined; i++) {
      if (properties[i].id === id) {
        setForm(properties[i]);
      }
    }
  };

  const handleUpdate = () => {
    const updatedList = [];
    for (let i = 0; properties[i] !== undefined; i++) {
      if (properties[i].id === form.id) updatedList[updatedList.length] = form;
      else updatedList[updatedList.length] = properties[i];
    }
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
    <main className="flex-1 bg-gray-50 p-6 min-h-screen">
      <div className="flex justify-between items-center bg-white shadow-md rounded-2xl px-6 py-4 mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          🏠 Admin Dashboard
        </h1>
        <Link to="/">
          <Button
            text="Back to Home"
            className="bg-gradient-to-r from-emerald-500 to-emerald-500 text-white px-5 py-2 rounded-lg hover:from-emerald-600 hover:to-emerald-600"
          />
        </Link>
      </div>

      {/* VIEW TAB: Table */}
      {activeTab === "view" && (
        <div className="overflow-x-auto bg-white p-4 rounded-xl shadow-md">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">City</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                const rows = [];
                for (let i = 0; properties[i] !== undefined; i++) {
                  rows[rows.length] = (
                    <tr
                      key={properties[i].id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-4 py-2">{properties[i].id}</td>
                      <td className="px-4 py-2">{properties[i].name}</td>
                      <td className="px-4 py-2">{properties[i].city}</td>
                      <td className="px-4 py-2">{properties[i].type}</td>
                      <td className="px-4 py-2">{properties[i].price}</td>
                      <td className="px-4 py-2 flex gap-3">
                        <button
                          onClick={() => handleEdit(properties[i].id)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(properties[i].id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  );
                }
                return rows;
              })()}
            </tbody>
          </table>
        </div>
      )}

      {/* ADD, EDIT, DELETE Tabs */}
      {activeTab === "add" && (
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl">
          <h2 className="text-xl font-semibold mb-4">Add New Property</h2>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="Country"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="border p-2 rounded w-full mb-2"
          />
          <button
            onClick={handleAdd}
            className="bg-[#7FC68A] text-white px-4 py-2 rounded-lg"
          >
            Add Property
          </button>
        </div>
      )}

      {activeTab === "edit" && (
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl">
          <h2 className="text-xl font-semibold mb-4">Edit Property</h2>
          <input
            type="text"
            placeholder="ID"
            value={form.id}
            onChange={(e) => setForm({ ...form, id: Number(e.target.value) })}
            className="border p-2 rounded w-full mb-2"
          />
          <button
            onClick={() => handleEdit(Number(form.id))}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Fetch Property
          </button>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded w-full mt-3 mb-2"
          />
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border p-2 rounded w-full mt-3 mb-2"
          />
          <input
            type="text"
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="border p-2 rounded w-full mt-3 mb-2"
          />
          <input
            type="text"
            placeholder="Country"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
            className="border p-2 rounded w-full mt-3 mb-2"
          />
          <input
            type="text"
            placeholder="type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="border p-2 rounded w-full mt-3 mb-2"
          />
          <input
            type="text"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="border p-2 rounded w-full mt-3 mb-2"
          />
          <button
            onClick={handleUpdate}
            className="bg-[#7FC68A] text-white px-4 py-2 rounded-lg"
          >
            Update Property
          </button>
        </div>
      )}
    </main>
  );
};

export default DashboardHero;
