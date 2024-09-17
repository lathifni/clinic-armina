import express from 'express';
import authenticate from '../middleware/authenticate.js';
import {
    createTenagaMedis,
    deleteTenagaMedis,
    getAllTenagaMedis,
    updateTenagaMedis,
} from '../controllers/tenagaMedisController.js';
import { tenagaMedisUpload } from '../middleware/multer.js';

const tenagaMedisRouter = express.Router();

tenagaMedisRouter.post(
    '/tenaga-medis',
    authenticate,
    tenagaMedisUpload.single('image'),
    createTenagaMedis
);

tenagaMedisRouter.patch(
    '/tenaga-medis/:id',
    authenticate,
    tenagaMedisUpload.single('image'),
    updateTenagaMedis
);

tenagaMedisRouter.delete('/tenaga-medis/:id', authenticate, deleteTenagaMedis);
tenagaMedisRouter.get('/tenaga-medis', getAllTenagaMedis);

export default tenagaMedisRouter;
