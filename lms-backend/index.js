import express from 'express';
import cors from 'cors';
import connectDB from './Database/db.js';

import userRoute from './Routes/user.js';
import authRoute from './Routes/auth.js';
import moduleRoute from './Routes/module.js'

const app = express();

app.use('/uploads', express.static('uploads'));

//Database connection
connectDB().then(
  () => console.log('Database Connected....'),
  (error) => console.log(error),
);

app.use(cors()); //cors added
app.use(express.json({ extended: false })); //enables json

app.get('/', (req, res) => res.send('API Running'));

app.use('/api/user', userRoute);
app.use('/api/login', authRoute);
app.use('/api/module', moduleRoute);

const PORT = process.env.PORT || 5000;

//starting app
app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));

export default app;