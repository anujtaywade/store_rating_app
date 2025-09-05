import { useEffect, useState } from "react";
import React from "react";

import api from "../api/axios";

export default function OwnerDashboard() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchMyStores = async () => {
      try {
        const res = await api.get("/owner/stores", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setStores(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMyStores();
  }, []);

  return (
    <div className="min-h-screen bg-[#E0F0F6] p-6">
      <h2 className="text-2xl font-bold text-center mb-6">My Stores</h2>
      {stores.map((store) => (
        <div
          key={store.id}
          className="bg-white p-6 mb-4 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-semibold">{store.name}</h3>
          <p className="text-gray-600">{store.address}</p>
          <p className="text-sm">⭐ {store.avg_rating}</p>
        </div>
      ))}
    </div>
  );
}
