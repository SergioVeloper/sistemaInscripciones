var VerifyToken = require('./VerifyToken');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('../models/User');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/config');
var logger = require('../config/log');

// LOGIN
router.post('/', function(req, res) {
    logger.info("Begin Login User");
    User.findOne({ email: req.body.email }).exec()
    .then(user => {
        if (!user) {
            logger.warn("User not found: " + req.body.email);
            return res.status(404).send('No user found.');
        }
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            logger.warn("Invalid password for user: " + req.body.email);
            return res.status(401).send({ auth: false, token: null });
        }
        var token = jwt.sign(
            { id: user._id, isSeller: user.isSeller, isBuyer: user.isBuyer, isAdmin: user.isAdmin },
            config.secret,
            { expiresIn: 86400 } // expires in 24 hours
        );
        res.status(200).send({ auth: true, token: token });
        logger.info("End Login User");
    })
    .catch(err => {
        logger.error("Error during login process:", err);
        res.status(500).send({ message: 'An error occurred during the login process.' });
    });
});


//
router.get('/', VerifyToken, function(req, res, next) {
    logger.info("Begin ");
    User.findById(req.userId, { password: 0 }, function(err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
        logger.info("End ");
    });
});

// add the middleware function
router.use(function(user, req, res, next) {
    res.status(200).send(user);
});

module.exports = router;