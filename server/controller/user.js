/* eslint-disable no-unused-vars */
const models  = require('../models');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const salt   = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
// get config vars
dotenv.config();
const moment = require('moment')
const Hashids = require('hashids/cjs')
const hashids = new Hashids('', 5)

function generateAccessToken(email) {
    return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: '24h' }); //24 jam
}

function filterDataUser(data) {
    const datas = {
        id: hashids.encode(data.id),
        name: data.name,
        phone: data.phone,
        phone_verif: data.phone_verif,
        email: data.email,
        email_verif: data.email_verif,
        photo: data.photo,
        recruiter: data.recruiter,
        job_seeker: data.job_seeker,
    }

    return datas
}

const userController = {
    async signup(req,res) {

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            } else {
                const cekEmailIsExist = await models.user.findOne({where: { 
                    email: req.body.email} }
                );

                const cekPhoneIsExist = await models.user.findOne({where: { 
                    phone: req.body.phone} }
                );

                if (cekEmailIsExist) {
                    return res.status(404).json({
						email: req.body.email,
						message: "Error",
						errors: "email has been used by another user."
					});
                } else {
                    if (cekPhoneIsExist) {
                        return res.status(422).json({
                            phone: req.body.phone,
                            message: "Error",
                            errors: "phone has been used by another user."
                        });
                    } else {
                        const user = await models.user.create(
                            {
                                name : req.body.name,
                                phone : req.body.phone,
                                phone_verif : false,
                                email : req.body.email,
                                email_verif : false,
                                password : bcrypt.hashSync(req.body.password, salt),
                                photo : '',
                                recruiter: req.body.recruiter,
                                job_seeker: req.body.job_seeker,
                            }
                        );
                        
                        res.status(200).json({
                            'message': 'registered successfully.',
                            'data': user
                        });
                    }   
                    
                }

            }
        }
        catch(e){
            console.log(e);
            res.status(400).send(e);
        }
                    
    },

    async signin(req,res) {
        try {
                const user = await models.user.findOne({
                    where: {
                        email: req.body.email
                    }
                }
                );

                if (!user) {
                    return res.status(404).send({
						auth: false,
						email: req.body.email,
						accessToken: null,
						message: "Error",
						errors: "User Not Found."
					});
                }

                const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
                if (!passwordIsValid) {
					return res.status(401).send({
						auth: false,
						password: req.body.password,
						accessToken: null,
						message: "Error",
						errors: "Invalid Password!"
					});
				}

                const token = generateAccessToken({email: user.email })

                const newDataUser = filterDataUser(user)

                res.status(200).json({
                    auth: true,
                    accessToken: token,
                    data: newDataUser,
					message: "login success.",
					errors: null
                });
            }
        catch(e){
            console.log(e);
            res.status(500).send({
                auth: false,
                email: req.body.email,
                password: req.body.password,
                accessToken: null,
                message: "Error",
                errors: e
            });
        }     
    },

    async checkToken(req, res) {
        try {
            jwt.verify(req.body.token, process.env.TOKEN_SECRET, function(err, decoded) {
                if (err){
                    res.status(500).json({
                        message: 'token expired',
                        expired: moment(err.expiredAt).format('DD-MM-YYYY H:m:s')
                    })
                } else {
                    res.status(200).json({
                        message: 'token not expired',
                        expired: ''
                    })
                }
            })
        } catch(error) {
            res.status(500).json({
                error: error
            })
        }
    },

    async update(req,res) {
        try{
            const userCollection = await models.user.find({
                id : req.params.userId
            });

            if(userCollection){
                const updatedUser = await models.user.update({
                    id: req.body.email
                });

                res.status(201).send(updatedUser)

            }
            else{
                res.status(404).send("User Not Found");
            }

        }
        catch(e){
            console.log(e);
            res.status(500).send(e);
        }
    } 
}

module.exports = userController