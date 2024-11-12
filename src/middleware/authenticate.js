import jwt from "jsonwebtoken";

export const isAuthenticatedAdmin = async (req, res, next) => {
  const { etat } = req.cookies;

  if (!etat) {
    return next(
      res.status(401).json({ message: "Authentication token not found" })
    );
  }

  try {
    const decoded = jwt.verify(etat, process.env.JWT_SECRET);
    req.decoded = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};
