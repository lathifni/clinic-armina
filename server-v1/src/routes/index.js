import express from 'express';
import userRouter from './userRoute.js';
import tentangRouter from './tentangRoute.js';
import errorrHandling from '../controllers/errorHandlingController.js';
import layananRouter from './layananRoute.js';
import fasilitasRouter from './fasilitasRoute.js';
import tenagaMedisRouter from './tenagaMedisRoute.js';
import faqRouter from './faqRoute.js';
import subLayananRouter from './subLayananRoute.js';
import promoRouter from './promoRoute.js';
import misiRouter from './misiRoute.js';
import galeriRouter from './galeriRoute.js';
import testimoniRouter from './testimoniRoute.js';

const route = express.Router();

const routers = [
    userRouter,
    layananRouter,
    tentangRouter,
    fasilitasRouter,
    tenagaMedisRouter,
    faqRouter,
    subLayananRouter,
    promoRouter,
    misiRouter,
    galeriRouter,
    testimoniRouter,
];

routers.forEach((router) => route.use('/api', router));

route.use('*', errorrHandling);
route.use('*', (req, res) => {
    res.status(404).json({
        errors: ['Page Not Found'],
        message: 'Internal Server Error',
        data: null,
    });
});

export default route;
