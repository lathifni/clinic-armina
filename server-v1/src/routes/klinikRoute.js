import express from 'express';
import { updateStruktur, updateVisi } from '../controllers/klinikController.js';
import authenticate from '../middleware/authenticate.js';
import { strukturUpload } from '../middleware/multer.js';

const klinikRouter = express.Router();

klinikRouter.patch(
    '/gambar-struktur',
    authenticate,
    strukturUpload,
    updateStruktur,
);
klinikRouter.patch('/visi', authenticate, updateVisi);
