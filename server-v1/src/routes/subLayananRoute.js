import express from 'express';
import authenticate from '../middleware/authenticate.js';
import {
    createSubLayanan,
    deleteSubLayanan,
    getAllSubLayanan,
    updateSubLayanan,
} from '../controllers/subLayananController.js';
import { subLayananUpload } from '../middleware/multer.js';

const subLayananRouter = express.Router();

subLayananRouter.post(
    '/sub-layanan',
    authenticate,
    subLayananUpload.single('image'),
    createSubLayanan
);

subLayananRouter.patch(
    '/sub-layanan/:id',
    authenticate,
    subLayananUpload.single('image'),
    updateSubLayanan
);

subLayananRouter.delete('/sub-layanan/:id', authenticate, deleteSubLayanan);
subLayananRouter.get('/sub-layanan', getAllSubLayanan);

export default subLayananRouter;
