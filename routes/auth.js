const jwt  =require('jsonwebtoken');
  let generateObj={};
  //generate jwt token
    generateObj.tokenGenerator=function(phone,key){
    let token  = jwt.sign({phonenumber:phone},key,{expiresIn:'24h'});
     //console.log(token);
     // return the JWT token for the future API calls
     return ({
         success: true,
         message: 'Authentication successful!',
         token: token
       });
}
generateObj.authorization = function (req,res,next){
            let token =  req.headers["x-access-token"]||req.headers["authorization"];
              //   console.log(token);
            if(!token){
                       res.status(401).send("access denied,first log in");
               }
               try{
                  let decoder = jwt.verify(token,"secret");
                  // console.log(decoder);
                   req.user=decoder;
                   next();
               }catch(err){
                  //  res.status(400).send('invalid token');
                   throw err;
               }
  }
module.exports=generateObj;