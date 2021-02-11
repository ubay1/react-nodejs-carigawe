/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
// get config vars
dotenv.config();

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({"error": err})
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = auth