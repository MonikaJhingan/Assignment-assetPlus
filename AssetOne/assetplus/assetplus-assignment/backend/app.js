const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 8000
const cors = require('cors')
const connectDB = require('./config/db');


connectDB();

app.use(cors());

app.use(require("./routes"));
app.use(express.json())
app.use('/api', require('./routes/image'))


app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})


process.on('SIGINT', async function () {
    await mongoose.disconnect();
    process.exit(0)
});