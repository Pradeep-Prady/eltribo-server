// import mongoose from "mongoose";

// class AdminModel {
//   constructor() {
//     const Enquiry = new mongoose.Schema({
//       name: String,
//       mail: String,
//       phno: String,
//       message: String,
//       quantity: Number,
//       date: {
//         type: Date,
//         default: Date.now,
//       },
//     });

//     const Category = new mongoose.Schema({
//       name: {
//         type: String,
//         unique: true,
//       },
//       description: String,
//       img: String,
//       products: [{ type: mongoose.Schema.Types.ObjectId, ref: "adminProduct" }],
//     });

//     const Admin2Schema = new mongoose.Schema({
//       name: String,
//       description: String,
//       size: String,
//       cost: Number,
//       // category: String,
//       callback: [{ type: mongoose.Schema.Types.ObjectId, ref: "Enquiry" }],
//       img: [],
//       topimg: String,
//       discount: {
//         percentage: Number,
//         cost: Number,
//       },
//     });

//     const ContactUsSchema = new mongoose.Schema({
//       name: String,
//       mail: String,
//       phno: String,
//       message: String,
//       date: {
//         type: Date,
//         default: Date.now,
//       },
//     });

//     const UserCred = new mongoose.Schema({
//       username: String,
//       password: String,
//       contatusMail: Number,
//       enquiryMail: Number,
//     });

//     this.product = mongoose.model("adminProduct", Admin2Schema);
//     this.contact = mongoose.model("Contact Us", ContactUsSchema);
//     this.enquiry = mongoose.model("Enquiry", Enquiry);
//     this.user = mongoose.model("User Credientials", UserCred);
//     this.category = mongoose.model("Category", Category);
//   }
// }

// export const Admin2db = new AdminModel();
import mongoose from "mongoose";

class AdminModel {
  constructor() {
    const Enquiry = new mongoose.Schema({
      name: String,
      mail: String,
      phno: String,
      message: String,
      quantity: Number,
      date: {
        type: Date,
        default: Date.now,
      },
    });

    const Category = new mongoose.Schema({
      name: {
        type: String,
        unique: true,
      },
      description: String,
      img: String,
      products: [{ type: mongoose.Schema.Types.ObjectId, ref: "adminProduct" }],
    });

    const Admin2Schema = new mongoose.Schema({
      name: String,
      description: String,
      size: String,
      cost: Number,
      category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
      callback: [{ type: mongoose.Schema.Types.ObjectId, ref: "Enquiry" }],
      img: [],
      topimg: String,
      discount: {
        percentage: Number,
        cost: Number,
      },
      specifications: [
        {
          _id: mongoose.Schema.Types.ObjectId, // Adding custom _id
          key: {
            type: String,
            required: true,
          },
          value: {
            type: String,
            required: true,
          },
        },
      ],
       // Specifications field as an array of objects
      // slug: {
      //   type: String,
      // },
      metaTitle: {
        type: String,
      },
      metaDescription: {
        type: String,
      },
      // metaKeywords: [
      //   {
      //     type: String,
      //   },
      // ],

      metaKeywords:  
        {
          type: String,
        },
      
    });

    const ContactUsSchema = new mongoose.Schema({
      name: String,
      mail: String,
      phno: String,
      message: String,
      date: {
        type: Date,
        default: Date.now,
      },
    });

    const UserCred = new mongoose.Schema({
      username: String,
      password: String,
      contatusMail: Number,
      enquiryMail: Number,
    });

    this.product = mongoose.model("adminProduct", Admin2Schema);
    this.contact = mongoose.model("Contact Us", ContactUsSchema);
    this.enquiry = mongoose.model("Enquiry", Enquiry);
    this.user = mongoose.model("User Credientials", UserCred);
    this.category = mongoose.model("Category", Category);
  }
}

export const Admin2db = new AdminModel();
