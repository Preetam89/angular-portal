var mysql = require('mysql');
let config = require('../connect.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
let connection = mysql.createConnection(config);


exports.addUser = async function(req,res){
    const encryptedPassword = await bcrypt.hash('pass123', saltRounds)
    let params={
        "userName":req.body.userName,
        "mailId":req.body.mailId,
        "role":req.body.role,
        "password":encryptedPassword
     }

     console.log("node params--",params);
    connection.query('INSERT INTO users SET ?',params, function (error, results, fields) {
      if (error) {
        res.send({
          "code":400,
          "status":"error ocurred"
        })
      } else {
        res.send({
          "code":200,
          "status":"User added sucessfully"
            });
        }
    });
  }

exports.getAllUsers = async function(req,res){
    let params={}

    connection.query('SELECT * FROM users', function(error, results, fields){
        if(error){
            res.send({
                "code":400,
                "status":"error ocurred"
            })
        } else {
            res.send({
                "code":200,
                "status":"Got all users sucessfully",
                "result": results
            });
        }
    })
}

exports.getAllProfileNames = async function (req,res){
  let params = {}

  connection.query('SELECT profile FROM profiles', function(error,results,feilds){
    if(error){
      res.send({
        "code": 400,
        "status": "error occurred"
      })
    } else {
      res.send({
        "code":200,
        "status":"Got all profile names sucessfully",
        "result": results
      })
    }
  })
}