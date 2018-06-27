var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router()
var path = require('path')
var _ = require('underscore')
var LocalStorage = require('node-localstorage').LocalStorage;
var sessionStorage = require('sessionstorage');
localStorage = new LocalStorage('./scratch');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', function(req, res) {
    res.sendFile("login.html", { root: path.join(__dirname, '/views') });
})


router.get('/views/index.html', function(req, res) {
    res.sendFile("index.html", { root: path.join(__dirname, '/views') });
})

router.get('/views/register.html', function(req, res) {
    res.sendFile("register.html", { root: path.join(__dirname, '/views') });
})

router.post('/register_post', urlencodedParser, function(req, res) {
    var name = req.body.username;
    var passwd1 = req.body.password;
    const info = {
        name: name,
        passwd: passwd1
    }
    localStorage.setItem('user', JSON.stringify(info));
    var data2 = JSON.parse(localStorage.getItem('user'));
    console.log(data2)
    res.redirect('/');
    console.log('register success');
})

router.post('/login_post', urlencodedParser, function(req, res) {

    var name = req.body.username;
    var passwd = req.body.password;
    var dirAcc = JSON.parse(localStorage.getItem('user'));
    if (dirAcc) {
        if (name === dirAcc.name && passwd === dirAcc.passwd) {
            const UserInfoNow = {
                name: name,
                passwd: passwd
            }
            sessionStorage.setItem('userState', JSON.stringify(UserInfoNow));
            res.redirect('/views/index.html');
            console.log(name + ' login success');
        } else {
            res.redirect('/');
            console.log('password not right');
        }
    } else {
        res.redirect('/views/register.html');
        console.log('have no user,register');
    }
    res.end();
})

module.exports = router;