import jwt from "jsonwebtoken";
import _ from "lodash";

// export const getDashboard = async (req, res, next) => {
//   try {
//     const categories = await getAllCategories();
//     const items = await getItems();
//     const users = await getAllUsers();
//     const orders = await getAll();

//     return next(
//       new AppSuccess(
//         {
//           categoriesCount: categories.length,
//           itemsCount: items.length,
//           usersCount: users.length,
//           ordersCount: orders.length,
//         },
//         "Dashboard Data successfully Send",
//         SUCCESS
//       )
//     );
//   } catch (err) {
//     return next(new AppError("Something went wrong", BADREQUEST));
//   }
// };

// export const getDashboardDetails = async (req, res, next) => {
//   try {
//     const categories = await getAllCategories();

//     return next(
//       new AppSuccess(
//         {
//           categoriesCount: categories.length,
//           categories: categories,
//         },
//         "Dashboard Data successfully Send",
//         SUCCESS
//       )
//     );
//   } catch (err) {
//     return next(new AppError(res, "Something went wrong", BADREQUEST));
//   }
// };

// export const loginAdmin = async (req, res, next) => {
//   const { username, password } = req.body;

//   if (_.isEmpty(username) || _.isEmpty(password)) {
//     // return next(new AppError("Username and Password are required", BADREQUEST));
//     res.status(400).json({
//       success: false,
//       message: "Username and Password are required",
//     });
//   }

//   if (username === process.env.USERID && password === process.env.PASSWORD) {
//     const token = jwt.sign({ username }, process.env.JWT_SECRET, {
//       expiresIn: process.env.JWT_EXPIRES_TIME,
//     });

//     const options = {
//       expires: new Date(
//         Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
//       ),
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production", // Use secure cookies in production
//       sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Adjust SameSite attribute based on environment
//     };

//     res.cookie("etat", token, options);

//     res.status(200).json({
//       success: true,
//       admin: true,
//     });
//   } else {
//     res.status(401).json({
//       success: false,
//       message: "Invalid username or password",
//     });
//   }
// };

// export const getAdminProfile = async (req, res, next) => {
//   try {
//     res.status(200).json({
//       success: true,
//       admin: true,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

// export const logoutAdmin = async (req, res, next) => {
//   const options = {
//     expires: new Date(Date.now()),
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production", // Use secure cookies in production
//     sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Adjust SameSite attribute based on environment
//   };

//   res.cookie("at", null, options);

//   res.status(200).json({
//     success: true,
//   });
// };
