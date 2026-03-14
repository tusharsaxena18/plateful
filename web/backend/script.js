const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); 

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connection Established"))
  .catch((err) => console.error(err));

// API routes
app.use("/api/donors", require("./routes/donors"));
app.use("/api/sharers", require("./routes/sharers"));
app.use("/api/raw", require("./routes/raw"));
app.use("/api/cooked", require("./routes/cooked"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
