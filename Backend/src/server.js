const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/auth", require("./routes/auth"));
app.use("/admin", require("./routes/admin"));
app.use("/user", require("./routes/user"));
app.use("/owner", require("./routes/owner"));



app.get("/", (req, res) => res.send("Backend is running..."));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
