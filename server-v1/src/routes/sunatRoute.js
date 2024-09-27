import authenticate from '../middleware/authenticate.js';
import { sunatUpload } from '../middleware/multer.js';
import express from 'express';
import {
    createSunat,
    getAllSunat,
    getSunatById,
    updateSunat,
} from '../controllers/sunatController.js';

const sunatRouter = express.Router();

sunatRouter.post(
    '/sunat',
    authenticate,
    sunatUpload.single('image'),
    createSunat
);

sunatRouter.patch(
    '/sunat/:id',
    authenticate,
    sunatUpload.single('image'),
    updateSunat
);

sunatRouter.get('/sunat', getAllSunat);
sunatRouter.get('/sunat/:id', getSunatById);

export default sunatRouter;
