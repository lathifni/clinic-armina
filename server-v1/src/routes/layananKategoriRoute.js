import express from 'express';
import authenticate from '../middleware/authenticate.js';
import {
    createLayananKategori,
    deleteLayananKategori,
    getAllLayananKategori,
    updateLayananKategori,
} from '../controllers/layananKategoriController.js';
import { layananKategoriUpload } from '../middleware/multer.js';

const layananKategoriRouter = express.Router();

layananKategoriRouter.post(
    '/layanan/kategori',
    layananKategoriUpload.single('image'),
    createLayananKategori
);
layananKategoriRouter.put(
    '/layanan/kategori/:id',
    layananKategoriUpload.single('image'),
    updateLayananKategori
);
layananKategoriRouter.delete('/layanan/kategori/:id', deleteLayananKategori);
layananKategoriRouter.get('/layanan/kategori', getAllLayananKategori);

export default layananKategoriRouter;
