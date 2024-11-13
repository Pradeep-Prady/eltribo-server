import { AppSucc } from "../../helpers/Appres.js";
import { validate } from "../../helpers/validate.js";
import { CategoryV } from "../../validator/categoryV.js";
import { service } from "../../helpers/service.js";
import { CateogryS } from "./categoryService.js";
import { Admin2db } from "../../db/mongoose/admin2Schema.js";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { promisify } from "util";

 
import { readFile } from 'fs/promises';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
class CategoryController {
  constructor() {}

  async add(req, res, next) {
    await validate(req, next, CategoryV.category);
    const category = await service(req, next, CateogryS.add);
    return next(new AppSucc(category, "success", 200));
  }

  async get(req, res, next) {
    const category = await service(req, next, CateogryS.get);
    return next(new AppSucc(category, "success", 200));
  }

  async getProducts(req, res, next) {
    // const category = await service(req, next, CateogryS.getProducts);

    // console.log(category)
    // return next(new AppSucc(category, "success", 200));

    
		console.log('here')
    const { products } = await Admin2db.category
      .findById(req.params.id)
      .populate("products");

  console.log("products",products?.length)

    let imageBuffer;
    const productsWithBase64Images = await Promise.all(
      products.map(async (product) => {
        const base64Images = await Promise.all(
          product.img.map(async (image) => {
            const imagePath = path.join(__dirname, "../../images", image);

            if(imagePath){
  try {
              imageBuffer = await readFile(imagePath);
            } catch (err) {
              console.log("👖", "in catch");
              return;
            }
          
            return `data:image/png;base64,${imageBuffer.toString("base64")}`;
            }
          
          })
        );
        return { ...product._doc, img: base64Images };
      })
    );
  console.log("productsWithBase64Images",productsWithBase64Images?.length)
    // return productsWithBase64Images;
    return next(new AppSucc(productsWithBase64Images, "success", 200));
  }

  async data(req, res, next) {
    const category = await service(req, next, CateogryS.data);
    return next(new AppSucc(category, "success", 200));
  }

  async getProductsName(req, res, next) {
    const category = await service(req, next, CateogryS.getProductsByName);
    return next(new AppSucc(category, "success", 200));
  }
}

export const CategoryC = new CategoryController();
