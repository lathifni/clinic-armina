import express from 'express';
import authenticate from '../middleware/authenticate.js';
import { promoUpload } from '../middleware/multer.js';
import {
    createPromo,
    deletePromo,
    getAllPromo,
    getPromoById,
    updatePromo,
} from '../controllers/promoController.js';

const promoRouter = express.Router();

promoRouter.post(
    '/promo',
    authenticate,
    promoUpload.single('image'),
    createPromo
);

promoRouter.patch(
    '/promo/:id',
    authenticate,
    promoUpload.single('image'),
    updatePromo
);

promoRouter.get('/promo', getAllPromo);
promoRouter.delete('/promo/:id', deletePromo);
promoRouter.get('/promo/:id', getPromoById);

export default promoRouter;
