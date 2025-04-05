require('dotenv').config();
const express = require("express");
const app = express();
const mongoConnect = require('./db')
const PORT = 8000 || process.env.PORT;
const cors = require("cors");
const userRoutes = require("./routes/user")

app.use(cors())
app.use(express.json())
app.use('/api/user',userRoutes)

app.listen(PORT, async() => {
    await mongoConnect(process.env.MONGO_URL);
    console.log(`Server is running on port ${PORT}`);
})