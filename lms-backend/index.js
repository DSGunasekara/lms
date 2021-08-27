import express from 'express';
import cors from 'cors';
import connectDB from './Database/db.js';

import userRoute from './Routes/user.js';
import authRoute from './Routes/auth.js';
import moduleRoute from './Routes/module.js'
import lectureRoute from './Routes/lecture.js'
import noticeRoute from './Routes/notice.js'
import fileRoute from './Routes/file.js'
import eventRoute from './Routes/event.js'
import resultRoute from './Routes/results.js'

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
app.use('/api/lecture', lectureRoute);
app.use('/api/notice', noticeRoute);
app.use('/api/file', fileRoute);
app.use('/api/event', eventRoute);
app.use('/api/results', resultRoute);

const PORT = process.env.PORT || 5000;

//starting app
app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));

export default app;