import { useEffect, useState } from "react";
import api from "../api/axios";

export default function UserStores() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    api.get("/user/stores").then((res) => setStores(res.data));
  }, []);

  const handleRating = async (id, rating) => {
    await api.post("/user/rate", { store_id: id, rating });
    const res = await api.get("/user/stores");
    setStores(res.data);
  };

  return (
    <div>
      <h2>All Stores</h2>
      {stores.map((s) => (
        <div key={s.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
          <h3>{s.name}</h3>
          <p>{s.address}</p>
          <p>Owner: {s.owner_name}</p>
          <p>Average Rating: {s.avg_rating}</p>
          <p>My Rating: {s.my_rating}</p>
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} onClick={() => handleRating(s.id, n)}>
              {n}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
