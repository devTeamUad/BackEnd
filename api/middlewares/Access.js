const jwt = require("jsonwebtoken");

exports.Token = (req, res, next) => {
    
    const token=req.header('access-token');
    if(!token) return res.status(401).json("Accès Refusé")
    try{
        const contenue=jwt.verify(token,process.env.tokenKey);
        req.worker=contenue;

        next();
    }catch(e){
        console.log(e.message)
        res.status(400).json('token incorrect')
    
}
}