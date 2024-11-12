import express from 'express';
import { loginAdmin } from './adminController.js';
 
const router = express.Router();

 
router.post('/login', loginAdmin);
// router.get('/get', CategoryC.get);
// router.get('/getProducts/:id', CategoryC.getProducts);

export default router;