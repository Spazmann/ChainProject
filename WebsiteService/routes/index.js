var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const dmList = [
    { name: 'Hiroshima Vault Dwellers', members: '10 Members' },
    { name: 'Hiroshima Vault Dwellers', members: '10 Members' },
    { name: 'Hiroshima Vault Dwellers', members: '10 Members' },
    { name: 'Hiroshima Vault Dwellers', members: '10 Members' },
    { name: 'Hiroshima Vault Dwellers', members: '10 Members' },
    { name: 'Hiroshima Vault Dwellers', members: '10 Members' },
    { name: 'Hiroshima Vault Dwellers', members: '10 Members' },
    { name: 'Hiroshima Vault Dwellers', members: '10 Members' },
    { name: 'Hiroshima Vault Dwellers', members: '10 Members' },
    { name: 'Hiroshima Vault Dwellers', members: '10 Members' },
    { name: 'Hiroshima Vault Dwellers', members: '10 Members' },
    { name: 'Hiroshima Vault Dwellers', members: '10 Members' },
    { name: 'Hiroshima Vault Dwellers', members: '10 Members' },
    { name: 'Hiroshima Vault Dwellers', members: '10 Members' },
    { name: 'Hiroshima Vault Dwellers', members: '10 Members' },
    { name: 'Hiroshima Vault Dwellers', members: '10 Members' },
    { name: 'Hiroshima Vault Dwellers', members: '10 Members' },
    { name: 'Hiroshima Vault Dwellers', members: '10 Members' },
    { name: 'Hiroshima Vault Dwellers', members: '10 Members' },
    { name: 'Hiroshima Vault Dwellers', members: '10 Members' },
    { name: 'Hiroshima Vault Dwellers', members: '10 Members' },
    { name: 'Hiroshima Vault Dwellers', members: '10 Members' },
    { name: 'Hiroshima Vault Dwellers', members: '10 Members' },
    { name: 'Hiroshima Vault Dwellers', members: '10 Members' },
    { name: 'Hiroshima Vault Dwellers', members: '10 Members' }
  ];
  const messsageList = [
    { username: 'Spazmann', message:'Hello this is Dimtri Mann'},
    { username: 'Spazmann', message:'Hello this is Dimtri Mann'},
    { username: 'Spazmann', message:'Hello this is Dimtri Mann Hello this is Dimtri Mann Hello this is Dimtri Mann Hello this is Dimtri Mann Hello this is Dimtri Mann Hello this is Dimtri Mann Hello this is Dimtri Mann Hello this is Dimtri Mann Hello this is Dimtri Mann Hello this is Dimtri Mann Hello this is Dimtri Mann'},
    { username: 'Spazmann', message:'Hello this is Dimtri Mann'},
    { username: 'Spazmann', message:'Hello this is Dimtri Mann'},
    { username: 'Spazmann', message:'Hello this is Dimtri Mann'},
    { username: 'Spazmann', message:'Hello this is Dimtri Mann'},
    { username: 'Spazmann', message:'Hello this is Dimtri Mann'},
    { username: 'Spazmann', message:'Hello this is Dimtri Mann'}
  ]
  res.render('index', { title: 'Home', dmList, messsageList });
});

module.exports = router;