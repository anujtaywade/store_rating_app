import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    api.get("/admin/dashboard").then((res) => setStats(res.data));
    api.get("/admin/users").then((res) => setUsers(res.data));
    api.get("/admin/stores").then((res) => setStores(res.data));
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Total Users: {stats.totalUsers}</p>
      <p>Total Stores: {stats.totalStores}</p>
      <p>Total Ratings: {stats.totalRatings}</p>

      <h3>Users</h3>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name} - {u.email} ({u.role})</li>
        ))}
      </ul>

      <h3>Stores</h3>
      <ul>
        {stores.map((s) => (
          <li key={s.id}>{s.name} - {s.email} (Avg: {s.avg_rating})</li>
        ))}
      </ul>
    </div>
  );
}
