var mysql      = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;
let config = require('../connect.js');
let connection = mysql.createConnection(config);



exports.register = async function(req,res){
    const password = req.body.password;
    const encryptedPassword = await bcrypt.hash(password, saltRounds)
    let users={
        "userName":req.body.username,
        "mailid":req.body.mailid,
        "role":req.body.role,
        "password":encryptedPassword
     }

    connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
      if (error) {
        res.send({
          "code":400,
          "failed":"error ocurred"
        })
      } else {
        res.send({
          "code":200,
          "success":"user registered sucessfully"
            });
        }
    });
  }

  exports.login = async function(req,res){
    var email= req.body.email;
    var password = req.body.password;
    connection.query('SELECT * FROM users WHERE mailid = ?',[email], async function (error, results, fields) {
      if (error) {
        res.send({
          "code":400,
          "failed":"login error ocurred"
        })
      }else{
        if(results.length >0){
            const comparision = await bcrypt.compare(password, results[0].password)
            // let comparision = false;
            // if(password == results[0].password){
            //     comparision = true;
            // }
            
          if(comparision){
              res.send({
                "code":200,
                "success":"login sucessfull"
              })
          }
          else{
            res.send({
                 "code":204,
                 "success":"Email and password does not match"
            })
          }
        }
        else{
          res.send({
            "code":206,
            "success":"Email does not exits"
              });
        }
      }
      });
  }