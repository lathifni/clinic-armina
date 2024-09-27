import express from 'express';
import authenticate from '../middleware/authenticate.js';
import {
    createFaq,
    deleteFaq,
    getAllFaq,
    updateFaq,
} from '../controllers/faqController.js';

const faqRouter = express.Router();

faqRouter.post('/faq', authenticate, createFaq);
faqRouter.get('/faq', getAllFaq);
faqRouter.put('/faq/:id', authenticate, updateFaq);
faqRouter.delete('/faq/:id', authenticate, deleteFaq);

export default faqRouter;
