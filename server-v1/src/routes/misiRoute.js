import express from "express";
import authenticate from "../middleware/authenticate.js";
import {addMisi, updateMisi} from "../controllers/misiController.js";

const misiRouter = express.Router();

misiRouter.post('/misi', authenticate, addMisi);
misiRouter.put('/misi/:id', authenticate, updateMisi);

export default misiRouter;