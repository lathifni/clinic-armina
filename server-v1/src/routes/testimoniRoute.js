import express from 'express';
import {
    createTestimoni,
    deleteTestimoni,
    getAllTestimoni,
    updateTestimoni,
} from '../controllers/testimoniController.js';
import authenticate from '../middleware/authenticate.js';

const testimoniRouter = express.Router();

testimoniRouter.get('/testimoni', getAllTestimoni);
testimoniRouter.post('/testimoni', authenticate, createTestimoni);
testimoniRouter.put('/testimoni/:id', authenticate, updateTestimoni);
testimoniRouter.delete('/testimoni/:id', authenticate, deleteTestimoni);

export default testimoniRouter;
