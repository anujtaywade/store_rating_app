import React from "react";

import { useEffect, useState } from "react";
import api from "../api/axios";

export default function UserDashboard() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await api.get("/user/stores", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setStores(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStores();
  }, []);

  const handleRate = async (store_id, rating) => {
    try {
      await api.post(
        "/user/rate",
        { store_id, rating },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("Rating submitted!");
    } catch (err) {
      alert("Failed to rate store");
    }
  };

  return (
    <div className="min-h-screen bg-[#E0F0F6] p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Available Stores</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stores.map((store) => (
          <div
            key={store.id}
            className="bg-[#89C2D9  ] p-6 rounded-lg shadow-md flex flex-col justify-between"
          >
            <h3 className="text-xl font-semibold">{store.name}</h3>
            <p className="text-gray-600">{store.address}</p>
            <p className="text-sm mt-2">⭐ {store.avg_rating}</p>
            <div className="mt-4 flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRate(store.id, star)}
                  className="px-2 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                >
                  {star}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
