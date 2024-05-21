var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const user = {Id:"3892132138210983021", Username:"Spazmann", Email:"email@gmail.com"}
  //const user = null
  if (!user) {
    res.render('login', { title: 'Login' });
  } else {

    const dmList = [
      { name: 'Vault Dwellers', members: '10 Members' },
      { name: 'Vault Dwellers', members: '10 Members' },
      { name: 'Vault Dwellers', members: '10 Members' },
      { name: 'Vault Dwellers', members: '10 Members' },
      { name: 'Vault Dwellers', members: '10 Members' },
      { name: 'Vault Dwellers', members: '10 Members' },
      { name: 'Vault Dwellers', members: '10 Members' },
      { name: 'Vault Dwellers', members: '10 Members' },
      { name: 'Vault Dwellers', members: '10 Members' },
      { name: 'Vault Dwellers', members: '10 Members' },
      { name: 'Vault Dwellers', members: '10 Members' },
      { name: 'Vault Dwellers', members: '10 Members' },
      { name: 'Vault Dwellers', members: '10 Members' },
      { name: 'Vault Dwellers', members: '10 Members' },
      { name: 'Vault Dwellers', members: '10 Members' },
      { name: 'Vault Dwellers', members: '10 Members' },
      { name: 'Vault Dwellers', members: '10 Members' },
      { name: 'Vault Dwellers', members: '10 Members' },
      { name: 'Vault Dwellers', members: '10 Members' }
    ]
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
    res.render('index', { title: 'Home', dmList, messsageList, user });
  }
});

module.exports = router;