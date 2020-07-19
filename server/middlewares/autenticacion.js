const jwt = require("jsonwebtoken");

let verificarToken = (req, res, next) => {
  let token = req.get("token");

  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      res.status(401).json({
        ok: false,
        err: err,
      });
    }
    // let usuario;
    req.usuario = decoded.usuario;
    next();
  });
};

let verificarAdmin_ROLE = (req, res, next) => {
  let usuario = req.usuario;
  
      
      if(usuario.role !== 'ADMIN_ROLE'){
         return res.status(401).json({
              ok:false,
              error:{
                  message:'No tienes privilegios para realizar esta operación'

              }
          })
      }else{
    
        next();
        
      }
      
};

module.exports = { verificarToken, verificarAdmin_ROLE };
