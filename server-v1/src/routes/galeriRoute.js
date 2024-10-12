import express from 'express';
import {
    createGaleri,
    deleteGaleri,
    getAllGaleri,
    updateGaleri,
} from '../controllers/galeriController.js';
import authenticate from '../middleware/authenticate.js';
import { galeriUpload } from '../middleware/multer.js';

const galeriRouter = express.Router();

galeriRouter.post(
    '/galeri',
    authenticate,
    galeriUpload.single('image'),
    createGaleri,
);
galeriRouter.put(
    '/galeri/:id',
    authenticate,
    galeriUpload.single('image'),
    updateGaleri,
);
galeriRouter.delete('/galeri/:id', authenticate, deleteGaleri);
galeriRouter.get('/galeri', getAllGaleri);

export default galeriRouter;
