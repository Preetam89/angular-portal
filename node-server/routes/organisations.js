var mysql = require('mysql');
let config = require('../connect.js');
let connection = mysql.createConnection(config);


exports.addOrganisation = async function(req,res){
    let params={
        "orgName":req.body.name,
        "orgType":req.body.type,
        "orgLocation":req.body.location
     }

    connection.query('INSERT INTO orgnisations SET ?',params, function (error, results, fields) {
      if (error) {
        res.send({
          "code":400,
          "status":"error ocurred"
        })
      } else {
        res.send({
          "code":200,
          "status":"organisation added sucessfully"
            });
        }
    });
  }

exports.getAllOrganisations = async function(req,res){
    let params={}

    connection.query('SELECT * FROM orgnisations', function(error, results, fields){
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

exports.getOrgById = async function(req,res){
    let params={
    }

    connection.query('SELECT * FROM eucaas.orgnisations WHERE orgnisations.orgId ='+req.params.orgId, function(error, results, fields){
        if(error){
            res.send({
                "code":400,
                "status":"error ocurred"
            })
        } else {
            res.send({
                "code":200,
                "status":"Got organisation name",
                "result": results
            });
        }
    })
}