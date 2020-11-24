var mysql = require('mysql');
let config = require('../connect.js');
let connection = mysql.createConnection(config);


exports.addProfile = async function(req,res){
    let params={
        "profile":req.body.profile,
        "profileOrg":req.body.profileOrg,
        "profileDescription":req.body.profileDescription
     }

    connection.query('INSERT INTO profiles SET ?',params, function (error, results, fields) {
      if (error) {
        res.send({
          "code":400,
          "status":"error ocurred"
        })
      } else {
        res.send({
          "code":200,
          "status":"Profile added sucessfully"
            });
        }
    });
  }

exports.getAllProfiles = async function(req,res){
    let params={}

    connection.query('SELECT * FROM profiles', function(error, results, fields){
        if(error){
            res.send({
                "code":400,
                "status":"error ocurred"
            })
        } else {
            res.send({
                "code":200,
                "status":"Got all profiles sucessfully",
                "result": results
            });
        }
    })
}

exports.getAllOrganisationNames = async function(req,res){
    let params={}

    connection.query('SELECT orgName FROM orgnisations', function(error, results, fields){
        if(error){
            res.send({
                "code":400,
                "status":"error ocurred"
            })
        } else {
            res.send({
                "code":200,
                "status":"Got all organisations sucessfully",
                "result": results
            });
        }
    })
}