import express from 'express';
import authenticate from '../middleware/authenticate.js';
import {
    createTentang,
    getAllTentang,
    getTentangById,
    updateTentang,
} from '../controllers/tentangController.js';
import { tentangUpload } from '../middleware/multer.js';

const tentangRouter = express.Router();

tentangRouter.post(
    '/tentang',
    authenticate,
    tentangUpload.single('image'),
    createTentang
);
tentangRouter.patch(
    '/tentang/:id',
    authenticate,
    tentangUpload.single('image'),
    updateTentang
);
tentangRouter.get('/tentang', getAllTentang);
tentangRouter.get('/tentang/:id', getTentangById);

export default tentangRouter;
