import express from 'express';
import userRouter from './userRoute.js';
import tentangRouter from './tentangRoute.js';
import errorrHandling from '../controllers/errorHandlingController.js';
import layananRouter from './layananRoute.js';
import fasilitasRouter from './fasilitasRoute.js';
import tenagaMedisRouter from './tenagaMedisRoute.js';
import faqRouter from './faqRouter.js';
import subLayananRouter from './subLayananRoute.js';

const route = express.Router();

route.use('/api', userRouter);
route.use('/api', layananRouter);
route.use('/api', tentangRouter);
route.use('/api', fasilitasRouter);
route.use('/api', tenagaMedisRouter);
route.use('/api', faqRouter);
route.use('/api', subLayananRouter);

route.use('*', errorrHandling);
route.use('*', (req, res) => {
    res.status(404).json({
        errors: ['Page Not Found'],
        message: 'Internal Server Error',
        data: null,
    });
});

export default route;
