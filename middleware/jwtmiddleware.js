import jwt from 'jsonwebtoken';


const jwtmiddleware=(req,res,next)=>{
    const token=req.header('Authorization').replace('Bearer','');
    if(!token) return res.status(401).json({message:'No token,authorization denied'});
    try {
        const decoded=jwt.verify(token,'secretkey');
        req.user=decoded;
        next();
        } catch (error) {
            res.status(401).json({message:'Invalid token'});
        }

};

export default jwtmiddleware;