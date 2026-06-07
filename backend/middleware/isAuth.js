import jwt from "jsonwebtoken";
const isAuth = async (req, res, next) => {
  try {
    // console.log("this is req",req);
    const token = req.cookies.token;
    // console.log("this is tokeen",token)
    if (!token) {
      return res.status(500).json({ message: "token is not found" });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res.status(500).json({ message: "verifyToken is not found" });
    }

    // console.log("this is verifytoken",verifyToken)


    req.userId = verifyToken.userId;
    next();

  } catch (error) {
    console.log("this is isAuth Middleware Error", error);
    return res.status(500).json({ message: "isAuth Error" });
  }
};

export default isAuth;
