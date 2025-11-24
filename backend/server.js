require('dotenv').config();
require('express-async-errors');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const connectDB = require('./src/config/db');


// routes
const authRoutes = require('./src/routes/auth');
const sensorRoutes = require('./src/routes/sensors');
const camRoutes = require('./src/routes/cam');
const accessRoutes = require('./src/routes/access');
const settingsRouter = require('./src/routes/settings');
const profileRouter = require('./src/routes/profile');

const app = express();
const PORT = process.env.PORT || 5000;
// Connect DB
connectDB();


// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: ['https://smart-home-ui.netlify.app', 'http://localhost:5173']
}));


// Static uploads
app.use('/uploads', express.static('uploads'));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sensors', sensorRoutes);
app.use('/api/cam', camRoutes);
app.use('/api/access', accessRoutes);
const facesRoutes = require('./src/routes/faces');
app.use('/api/notifications', require('./src/routes/notifications'));
app.use('/api/faces', facesRoutes);
app.use("/api/settings", require("./src/routes/settings"));
app.use('/api/settings', settingsRouter);
app.use('/api/profile', profileRouter);

app.get('/', (req, res) => res.json({ ok: true, message: 'Smart Home Security API' }));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));