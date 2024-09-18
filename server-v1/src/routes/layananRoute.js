import express from 'express';
import authenticate from '../middleware/authenticate.js';
import { layananKategoriUpload } from '../middleware/multer.js';
import {
    createLayanan,
    deleteLayanan,
    getAllLayanan,
    updateLayanan,
} from '../controllers/layananController.js';

const layananRouter = express.Router();

layananRouter.post(
    '/layanan',
    authenticate,
    layananKategoriUpload.single('image'),
    createLayanan
);
layananRouter.put(
    '/layanan/:id',
    authenticate,
    layananKategoriUpload.single('image'),
    updateLayanan
);
layananRouter.delete('/layanan/:id', authenticate, deleteLayanan);
layananRouter.get('/layanan', getAllLayanan);

export default layananRouter;
