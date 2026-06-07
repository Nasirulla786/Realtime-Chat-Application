import jwt from "jsonwebtoken"

const generateToken = (id)=>{
    try {

        const token = jwt.sign({ userId:id}, process.env.JWT_SECRET);
        if(!token) {
            console.log("token can not be assign");
        }

        return token


    } catch (error) {
        console.log("this is genrate token error",error);

    }
}


export default generateToken;
