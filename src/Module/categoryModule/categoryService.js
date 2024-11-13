import { Admin2db } from "../../db/mongoose/admin2Schema.js";
import { AppErr } from "../../helpers/Appres.js";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { promisify } from "util";
import { readFile } from "fs/promises";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const readFile = promisify(fs.readFile);
const unlink = promisify(fs.unlink);

class CategoryService {
  constructor() {}

  async add(req) {
    let data;
    try {
      data = await Admin2db.category.create(req.body);
    } catch (err) {
      return new AppErr(err.message, 400);
    }
    return data;
  }

  async get(req) {
    try {
      const data = await Admin2db.category.find({});

      console.log(data);
      return data;
    } catch (err) {
      // res.json(err.message, 400)
      return new AppErr(err.message, 400);
    }
  }

  async getProducts(req) {
    try {
      console.log("here");
      const { products } = await Admin2db.category
        .findById(req.params.id)
        .populate("products");

      console.log("products", products?.length);

      let imageBuffer;
      const productsWithBase64Images = await Promise.all(
        products.map(async (product) => {
          const base64Images = await Promise.all(
            product.img.map(async (image) => {
              const imagePath = path.join(__dirname, "../../images", image);
              try {
                imageBuffer = await readFile(imagePath);
              } catch (err) {
                console.log("👖", "in catch");
                return;
              }
              v;
              return `data:image/png;base64,${imageBuffer.toString("base64")}`;
            })
          );
          return { ...product._doc, img: base64Images };
        })
      );
      console.log("productsWithBase64Images", productsWithBase64Images?.length);
      return productsWithBase64Images;
    } catch (err) {
      return new AppErr(err.message, 400);
    }
  }

  //   async getProductsByName(req) {
  //     try {
  //       const allProducts = await Admin2db.product.find({}).populate("category");

  //       let products = allProducts?.filter((product) => {
  //         console.log(product?.category?.name, req.params.name);
  //         return product.category.name === req.params.name;
  //       });

  //       let imageBuffer;
  //       const productsWithBase64Images = await Promise.all(
  //         products.map(async (product) => {
  //           const base64Images = await Promise.all(
  //             product.img.map(async (image) => {
  //               const imagePath = path.join(__dirname, "../../images", image);
  //               try {
  //                 imageBuffer = await readFile(imagePath);
  //               } catch (err) {
  //                 console.log("👖", "in catch");
  //                 return;
  //               }
  //               return `data:image/png;base64,${imageBuffer.toString("base64")}`;
  //             })
  //           );
  //           return { ...product._doc, img: base64Images };
  //         })
  //       );
  //       return productsWithBase64Images;
  //     } catch (err) {
  //       console.log(err);
  //       return new AppErr(err.message, 400);
  //     }
  //   }

  async getProductsByName(req) {
    try {
      // Retrieve all products and populate the category field
      const allProducts = await Admin2db.product.find({}).populate("category");

      // Filter products by category name
      let products;
      if (req.params.name === "products") {
        products = allProducts;
      } else {
        products = allProducts.filter((product) => {
          console.log(product?.category?.name, req.params.name);
          return product.category?.name === req.params.name;
        });
      }

      // Map over products and add base64 images for each one
      const productsWithBase64Images = await Promise.all(
        products.map(async (product) => {
          const base64Images = await Promise.all(
            product.img.map(async (image) => {
              try {
                const imagePath = path.join(__dirname, "../../images", image);
                const imageBuffer = await readFile(imagePath);
                return `data:image/png;base64,${imageBuffer.toString(
                  "base64"
                )}`;
              } catch (err) {
                console.error("Image read error:", err);
                return null; // Skip if the image cannot be read
              }
            })
          );

          // Filter out any null values from failed image reads
          return { ...product._doc, img: base64Images.filter(Boolean) };
        })
      );

      return productsWithBase64Images;
    } catch (err) {
      console.error("Error in getProductsByName:", err);
      return new AppErr(err.message, 400);
    }
  }

  async data(req) {
    return "data";
  }
}

export const CateogryS = new CategoryService();
