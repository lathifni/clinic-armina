import express from 'express';
import './winston.js';
import route from '../routes/index.js';
import cors from 'cors';
const appMiddleware = express();

appMiddleware.use(
    cors({
        origin: true,
        credentials: true,
        preflightContinue: false,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    })
);
appMiddleware.options('*', cors());
appMiddleware.use(express.json());
appMiddleware.use(route);

export default appMiddleware;
