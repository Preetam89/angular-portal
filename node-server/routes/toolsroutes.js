var mysql = require('mysql');
let config = require('../connect.js');
let connection = mysql.createConnection(config);

var tempuserId = 0;

exports.getAllTools = async function (req, res) {
    let params = {}

    connection.query('SELECT toolsId,name FROM tools', function (error, results, fields) {
        if (error) {
            res.send({
                "code": 400,
                "status": "error ocurred"
            })
        } else {
            res.send({
                "code": 200,
                "status": "Got all tools sucessfully",
                "result": results
            });
        }
    })
}

exports.getToolbyId = async function (req, res) {
    let params = {}
    // SELECT `tools`.`name` FROM `eucaas`.`tools` WHERE `toolsId` IN (1, 5 , 7);
    connection.query('SELECT * FROM tools WHERE toolsId IN ('+ req.params.toolsId+')', function (error, results, fields) {
        if (error) {
            res.send({
                "code": 400,
                "status": "error ocurred"
            })
        } else {
            res.send({
                "code": 200,
                "status": "Got tool sucessfully",
                "result": results
            });
        }
    })
}

function addTools(userid,toolid,orgid){
    console.log('func adddd');
    let params = {
        "userId": userid,
        "toolId": toolid,
        "orgId": orgid
    }
    connection.query('INSERT INTO usertools SET ?', params, function (error, results, fields) {
        if (error) {
            return "error ocurred";
        } else {
            return "Tools id added sucessfully";
        }
    });
}

function updateTools(userid,toolid,orgid){
    console.log('func updateeee');
    let params = {
    }
    connection.query('UPDATE usertools SET userId='+userid+', toolId="'+toolid+'" WHERE orgId='+orgid , params, function (error, results, fields) {
        if (error) {
            return "error ocurred";
        } else {
            return "Tools id updated sucessfully";
        }
    });
}

exports.mapUserToolOrg = async function (req, res) {

    
    if (req.body.userId != '') {
        tempuserId = req.body.userId;
    }

    console.log("req.body.orgId==",req.body.toolId,"==",req.body.orgId);
    connection.query('SELECT orgId FROM usertools WHERE orgId = '+req.body.orgId, function (error, results, fields) {
        if (error) {
            res.send({
                "code": 400,
                "status": "error ocurred"
            })
        } else {
            if(results.length == 0){
                addTools(tempuserId, req.body.toolId, Number(req.body.orgId));
            } else {
                updateTools(tempuserId, req.body.toolId, Number(req.body.orgId));
                
            res.send({
                "code": 200,
                "status": "Tools updated sucessfully",
            });
            }
        }
    })
}


exports.getMapedUserToolOrg = async function (req, res) {
    let params = {}
    connection.query('SELECT * FROM usertools WHERE orgId =' + req.params.orgId, function (error, results, fields) {
        if (error) {
            res.send({
                "code": 400,
                "status": "error ocurred"
            })
        } else {
            res.send({
                "code": 200,
                "status": "Got users, tools sucessfully",
                "result": results
            });
        }
    })
}