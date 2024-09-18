import express from 'express';
import authenticate from '../middleware/authenticate.js';
import {
    createFasilitas,
    deleteFasilitas,
    getAllFasilitas,
    updateFasilitas,
} from '../controllers/fasilitasController.js';
import { fasilitasUpload } from '../middleware/multer.js';

const fasilitasRouter = express.Router();

fasilitasRouter.post(
    '/fasilitas',
    fasilitasUpload.single('image'),
    authenticate,
    createFasilitas
);

fasilitasRouter.patch(
    '/fasilitas/:id',
    fasilitasUpload.single('image'),
    authenticate,
    updateFasilitas
);

fasilitasRouter.delete('/fasilitas/:id', authenticate, deleteFasilitas);
fasilitasRouter.get('/fasilitas', getAllFasilitas);

export default fasilitasRouter;
