import express from 'express';
import { CategoryC } from './categoryController.js';
import { AppSucc } from '../../helpers/Appres.js';
// import { ProdC } from "../admin2/productModule/productController.js";
import { productRoute } from '../admin2/productModule/productRoute.js';

const CategoryRouter = express.Router();

CategoryRouter.get('/data', CategoryC.data);

CategoryRouter.post('/add', CategoryC.add);
CategoryRouter.get('/get', CategoryC.get);
CategoryRouter.get('/getProductsByName/:name', CategoryC.getProductsName);
CategoryRouter.get('/getproducts/:id', CategoryC.getProducts);


export { CategoryRouter };