import { useEffect, useState } from "react";
import api from "../api/axios";

export default function OwnerDashboard() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    api.get("/owner/stores").then((res) => setStores(res.data));
  }, []);

  return (
    <div>
      <h2>Owner Dashboard</h2>
      {stores.map((s) => (
        <div key={s.id}>
          <h3>{s.name}</h3>
          <p>{s.address}</p>
          <p>Avg Rating: {s.avg_rating}</p>
          <a href={`/owner/stores/${s.id}/ratings`}>View Ratings</a>
        </div>
      ))}
    </div>
  );
}
