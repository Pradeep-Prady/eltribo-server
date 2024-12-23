import { Admin2db } from "../../../db/mongoose/admin2Schema.js";
import { AppSucc } from "../../../helpers/Appres.js";
import { service } from "../../../helpers/service.js";
import { validate } from "../../../helpers/validate.js";
import { Admin2V } from "../../../validator/admin2V.js";
import { ProdS } from "./productService.js";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { promisify } from "util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readFile = promisify(fs.readFile);
const unlink = promisify(fs.unlink);
class ProductController {
  constructor() {}

  async addProduct(req, res, next) {
    console.log("add product");
    req.body = JSON.parse(req.body.product);
    await validate(req, next, Admin2V.product);
    const pro = await service(req, next, ProdS.addProduct);
    return next(new AppSucc(pro, "success", 200));
  }

  async getProduct(req, res, next) {
    const products = await Admin2db.product.find({});

  const productsWithBase64Images = await Promise.all(
        products.map(async (product) => {
          const base64Images = await Promise.all(
            product.img.map(async (image) => {
              const imagePath = path.join(__dirname, "../../../images", image);
              const imageBuffer = await readFile(imagePath);
              return `data:image/png;base64,${imageBuffer.toString("base64")}`;
            })
          );
          return { ...product._doc, img: base64Images };
        })
      );

  console.log(products, "products")
    // const pro = await service(req, next, ProdS.getProduct);
    // res.json({data: true});
    return next(new AppSucc( productsWithBase64Images , "success", 200));
  }

//   async getProduct(req, res, next) {
//     // const pro = await service(req, next, ProdS.getProduct);
//     // res.json({data: true});
//     return next(new AppSucc(true, "success", 200));
//   }
  async getOneProduct(req, res, next) {
    const pro = await service(req, next, ProdS.getOneProduct);
    return next(new AppSucc(pro, "success", 200));
  }

  async getOneProductByName(req, res, next) {
    console.log("getOneProductByName")
    const pro = await service(req, next, ProdS.getOneProductByName);

    console.log("pro",pro)
    return next(new AppSucc(pro, "success", 200));
  }
  

  async updateProduct(req, res, next) {
    req.body = JSON.parse(req.body.product);
    await validate(req, next, Admin2V.product);
    const pro = await service(req, next, ProdS.updateProduct);
    return next(new AppSucc(pro, "success", 200));
  }

  async updateImage(req, res, next) {
    const pro = await service(req, next, ProdS.updateImage);
    return next(new AppSucc(pro, "success", 200));
  }

  async deleteProduct(req, res, next) {
    const pro = await service(req, next, ProdS.deleteProduct);
    return next(new AppSucc(pro, "success", 200));
  }

  async deleteImage(req, res, next) {
    await validate(req, next, Admin2V.deleteImage);
    const pro = await service(req, next, ProdS.deleteImage);
    return next(new AppSucc(pro, "success", 200));
  }

  async contactUs(req, res, next) {
    // await validate(req, next, Admin2V.contactUs);
    const con = await service(req, next, ProdS.contactUs);
    return next(new AppSucc(con, "success", 200));
  }

  async getContact(req, res, next) {
    const con = await service(req, next, ProdS.getContact);
    return next(new AppSucc(con, "success", 200));
  }

  async getspecificContact(req, res, next) {
    const con = await service(req, next, ProdS.getspecificContact);
    return next(new AppSucc(con, "success", 200));
  }

  async contactDelete(req, res, next) {
    const con = await service(req, next, ProdS.contactDelete);
    return next(new AppSucc(con, "success", 200));
  }

  async enquiry(req, res, next) {
    await validate(req, next, Admin2V.enquiry);
    const enq = await service(req, next, ProdS.Enquiry);
    return next(new AppSucc(enq, "success", 200));
  }

  async getEnquiry(req, res, next) {
    const con = await service(req, next, ProdS.getEnquiry);
    return next(new AppSucc(con, "success", 200));
  }

  async login(req, res, next) {
    await validate(req, next, Admin2V.login);
    const con = await service(req, next, ProdS.login);
    return next(new AppSucc(req.body, "success", 200));
  }

  async dashboard(req, res, next) {
    const dashboard = await service(req, next, ProdS.dashboard);
    return next(new AppSucc(dashboard, "success", 200));
  }

  async update_topImg(req, res, next) {
    const dashboard = await service(req, next, ProdS.update_topImg);
    return next(new AppSucc(dashboard, "success", 200));
  }
}

export const ProdC = new ProductController();
