import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function UserDashboard() {  
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch stores from backend
  const fetchStores = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/user/stores"); 
      setStores(res.data);
      console.log("Stores fetched:", res.data); 
    } catch (err) {
      console.error("Error fetching stores:", err.response || err.message);
      setError(err.response?.data?.error || "Failed to fetch stores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  // Handle rating a store
  const handleRate = async (store_id, rating) => {
    try {
      setLoading(true);
      await api.post("/user/rate", { store_id, rating });
      await fetchStores(); // refresh stores to show updated average rating
      alert("Rating submitted!");
    } catch (err) {
      console.error("Error rating store:", err.response || err.message);
      alert("Failed to rate store");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#E0F0F6] p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Available Stores</h2>

      {loading && <p className="text-center text-gray-700">Loading stores...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stores.length === 0 && !loading && !error && (
          <p className="text-center text-gray-600 col-span-2">No stores found.</p>
        )}

        {stores.map((store) => (
          <div
            key={store.id}
            className="bg-[#89C2D9] p-6 rounded-lg shadow-md flex flex-col justify-between"
          >
             
            <h3 className="text-xl font-semibold">{store.name}</h3>
            <p className="text-gray-600">{store.address || "No address provided"}</p>
            <p className="text-gray-500 text-sm">
              Owner: {store.owner_name || "Unknown"}
            </p>
            <p className="text-sm mt-2">⭐ {store.avg_rating}</p>

            <div className="mt-4 flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRate(store.id, star)}
                  className="px-2 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:opacity-50"
                  disabled={loading}
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
