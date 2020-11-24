var express    = require("express");
var bodyParser = require('body-parser');
var app = express();

var login = require('./routes/loginroutes');
var addOrg = require('./routes/organisations');
var profile = require('./routes/profileroutes');
var user = require('./routes/userroutes');
var tools = require('./routes/toolsroutes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var router = express.Router();
// test route
// router.get('/', function(req, res) {
//     res.json({ message: 'welcome to our upload module apis' });
// });

//route to handle post
router.post('/register',login.register);
router.post('/login',login.login);
router.post('/addOrganisation',addOrg.addOrganisation);
router.post('/addProfile',profile.addProfile);
router.post('/addUser',user.addUser);
router.post('/mapUserToolOrg',tools.mapUserToolOrg);

//route to handle get
router.get('/getAllOrganisations',addOrg.getAllOrganisations);
router.get('/getAllProfiles',profile.getAllProfiles);
router.get('/getAllUsers',user.getAllUsers);
router.get('/getAllOrganisationNames',profile.getAllOrganisationNames);
router.get('/getAllProfileNames',user.getAllProfileNames);
router.get('/getOrgById/:orgId',addOrg.getOrgById);
router.get('/getAllTools',tools.getAllTools);
router.get('/getMapedUserToolOrg/:orgId', tools.getMapedUserToolOrg);
router.get('/getToolbyId/:toolsId', tools.getToolbyId);

app.use('/api', router);
app.listen(4000);