var Cryptr = require('cryptr');
cryptr = new Cryptr('myTotalySecretKey');
 
var connection = require('../config/config.js');
module.exports.authenticate=function(req,res){
    var email=req.body.email;
    var password=req.body.password;
   
   
    connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
      if (error) {
        res.json({
          status:false,
          message:'there are some error with query'
          })
      }else{
       
        if(results.length >0){
  decryptedString = cryptr.decrypt(results[0].password);

            if(password==decryptedString){
              // Adding page where you want to go after log in (Home)
              res.redirect("/chat") 
            }else{
              // Adding page to show incorrect password
              res.redirect("/incorrect") 
            }
        }
        else{
          res.redirect("/emailNotExist.handlebars") 
        }
      }
    });
}
