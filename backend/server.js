import cors from 'cors';
import express from 'express';
import { config as configDotenv } from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import apiRoutes from './routes/apiRoutes.js';

const port = process.env.PORT || 5000;
const app = express();
configDotenv();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    key: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        path: '/',
        maxAge: 60 * 60 * 24 * 1000,
    }
}));
app.use('/uploads', express.static('uploads'));
app.use(express.static('/public'));

app.use(apiRoutes);

app.listen(port, () => {
    console.log('Listening to port!' + port);
});