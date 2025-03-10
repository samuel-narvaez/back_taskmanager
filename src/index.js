const express = require('express');
const dotenv = require('dotenv');
const connect = require('./database/db.js');
dotenv.config();

//ROUTES
const v1RouterTask = require("./routes/v1/task");
const v1RouterAuth = require("./routes/v1/auth");

const cors = require('cors');
const app = express();
app.use(cors());

app.use(express.json({ limit: '150mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }));

//ROUTES
v1RouterTask(app);
v1RouterAuth(app);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err && err.status === undefined) {
    res.status(500).json({ details: err.message });
  } else {
    next(err);
  }
});


const PORT = process.env.PORT || 4000;
connect();
app.listen(PORT, () => { console.log(`🚀 Server listening on port ${PORT} y esta en modo: ${process.env.NODE_ENV}`) });