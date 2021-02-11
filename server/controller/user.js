/* eslint-disable no-unused-vars */
const models = require('../models');
const { validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const saltBcrypt = bcrypt.genSaltSync(10);

const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
// get config vars
dotenv.config();
const moment = require('moment')

const hashids = require('../utils/helper')

function generateAccessToken(data) {
  return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '24h' }); //24 jam
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
  async signup(req, res) {

    try {
        const cekEmailIsExist = await models.user.findOne({
          where: {
            email: req.body.email
          }
        });

        const cekPhoneIsExist = await models.user.findOne({
          where: {
            phone: req.body.phone
          }
        }
        );

        if (cekEmailIsExist) {
          return res.status(404).json({
            email: req.body.email,
            message: "Error",
            errors: "email telah digunakan oleh user lain."
          });
        } else {
          if (cekPhoneIsExist) {
            return res.status(422).json({
              phone: req.body.phone,
              message: "Error",
              errors: "nomor telepon telah digunakan oleh user lain."
            });
          } else {
            const user = await models.user.create(
              {
                name: req.body.name,
                phone: req.body.phone,
                phone_verif: false,
                email: req.body.email,
                email_verif: false,
                password: bcrypt.hashSync(req.body.password, saltBcrypt),
                photo: '',
                recruiter: req.body.recruiter,
                job_seeker: req.body.job_seeker,
                gender: req.body.gender,
              }
            );

            res.status(200).json({
              message: 'pendaftaran berhasil.',
              data: user
            });
          }

        }
    }
    catch (e) {
      console.log(e);
      res.status(500).send(e);
    }

  },

  async signin(req, res) {
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
          errors: "user tidak terdaftar."
        });
      }

      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({
          auth: false,
          password: req.body.password,
          accessToken: null,
          message: "Error",
          errors: "password tidak sesuai"
        });
      }

      const token = generateAccessToken({
        id: hashids.encode(user.id),
        name: user.name,
        phone: user.phone,
        phone_verif: user.phone_verif,
        email: user.email,
        email_verif: user.email_verif,
        photo: user.photo,
        recruiter: user.recruiter,
        job_seeker: user.job_seeker,
        gender: user.gender,
      })

      const newDataUser = filterDataUser(user)

      res.status(200).json({
        auth: true,
        accessToken: token,
        data: newDataUser,
        message: "berhasil masuk.",
        errors: null
      });
    }
    catch (e) {
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

  async signout(req, res) {
    try {
      const destroy = jwt.destroy(req.body.token)
      console.log(destroy)
      res.status(200).json(destroy)
    } catch (error) {
      res.status(500).json({
        error: error
      })
    }
  },

  async checkToken(req, res) {
    try {
      jwt.verify(req.body.token, process.env.TOKEN_SECRET, function (err, decoded) {
        if (err) {
          res.status(200).json({
            isExpired: true,
            message: 'token expired',
            expired: moment(err.expiredAt).format('DD-MM-YYYY H:m:s')
          })
        } else {
          console.log(res)
          res.status(200).json({
            isExpired: false,
            message: 'token not expired',
            expired: ''
          })
        }
      })
    } catch (error) {
      res.status(500).json({
        error: error
      })
    }
  },

  async getUser(req, res) {
    try {
      const decoded = jwt.verify(req.body.token, process.env.TOKEN_SECRET);
      res.status(200).json(decoded)
    } catch (error) {
      res.status(500).json({
        error: error
      })
    }
  },

  async update(req, res) {
    try {
      const userCollection = await models.user.find({
        id: req.params.userId
      });

      if (userCollection) {
        const updatedUser = await models.user.update({
          id: req.body.email
        });

        res.status(201).send(updatedUser)

      }
      else {
        res.status(404).send("User Not Found");
      }

    }
    catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  },

  async cobaAssociation(req, res) {
    try {
      const job = await models.job.findAll({
        include: [models.user]
      })
      console.log(job)
      return res.status(200).json(job)
    } catch(err) {
      console.log(err)
    }
  }
}

module.exports = userController