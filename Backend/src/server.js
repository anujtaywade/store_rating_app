const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/auth", require("./routes/auth"));


app.get("/", (req, res) => res.send("Backend is running..."));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
