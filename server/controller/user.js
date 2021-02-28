/* eslint-disable no-undef */
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

var nodemailer = require('nodemailer');
const send = require('../helper/sendEmail');

const fs = require('fs');
const mustache = require('mustache');

const crypto = require('crypto');
const algorithm = "aes-128-cbc";
const salt = "aB090bog4";
const hash = crypto.createHash("sha1");

hash.update(salt);

let key = hash.digest().slice(0, 16);
crypto.createHash('sha256').update(String(crypto.createSecretKey)).digest('base64').substr(0, 32);
const iv = crypto.randomBytes(16);

function decrypt(text) {
  let iv = Buffer.from(text.iv, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');

  let decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

function generateAccessToken(data) {
  return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '24h' }); //24 jam
}

function decodeToken(token) {
  return jwt.verify(token, process.env.TOKEN_SECRET);
}

function filterDataUser(data) {
  const datas = {
    id: hashids.encode(data.id),
    name: data.name,
    phone: data.phone,
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
        // phone: user.phone,
        // phone_verif: user.phone_verif,
        // email: user.email,
        // email_verif: user.email_verif,
        // photo: user.photo,
        // recruiter: user.recruiter,
        // job_seeker: user.job_seeker,
        // gender: user.gender,
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
        // password: req.body.password,
        accessToken: null,
        message: "Error",
        errors: e
      });
    }
  },

  async sendVerifyEmail(req, res) {
    const replaceToken = req.headers.authorization.replace('Bearer ', '')
    const decoded = decodeToken(replaceToken)
    const payload = { ...req }

    try {

      await send.sendVerifyEmail(decoded, payload, replaceToken);
      res.status(200).json({
        message: `email verifikasi telah dikirim ke email ${req.body.email}`,
      })
    } catch (error) {
      res.status(500).json({
        error: error
      })
    }
  },

  async verifyEmail(req, res) {

    const email = req.query.email;
    const token = req.query.token;
    const users = await models.user.findOne({
      where: {
        email: email,
      },
    })

    // jika email telah diverifikasi
    if (users.email_verif === true) {
      res.render('../views/sudah_verif', {
        message: 'email sudah diverifikasi sebelumnya'
      });
    } else {
      const parseToken = JSON.parse(token)
      const decryptedToken = decrypt(parseToken)
      console.log(decryptedToken)

      console.log('sudah expired = ', moment().isAfter(decryptedToken))
      // jika token tidak sesuai sama token yang ada di db
      if (users.email_verification_token !== parseToken.encryptedData) {
        res.render('../views/token_salah', {
          message: 'token tidak sesuai'
        });
      } else {
        // jika token telah kadaluarsa
        if (moment().isAfter(decryptedToken) === true) {
          res.render('../views/verif_gagal', {
            message: 'verifikasi email gagal, karna token telah kadaluarsa. silahkan lakukan verifikasi ulang'
          });
        }
        else {
          users.update({
            email_verif: true,
            email_verification_token: null
          })

          res.render('../views/verif_sukses', {
            message: 'verifikasi email sukses'
          });
        }
      }

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
      const replaceToken = req.headers.authorization.replace('Bearer ', '')
      const decoded = decodeToken(replaceToken)

      const users = await models.user.findOne({
        where: {
          id: hashids.decode(decoded.id)
        },
        attributes: [
          "name", "phone", "email", "email_verif", "photo", "background_image", "gender", "recruiter", "job_seeker",
        ],
        include: [{ model: models.job, attributes: ['content', 'expiredAt',] }]
      })

      res.status(200).json({
        message: "data tersedia",
        data: users,
      })
    } catch (error) {
      res.status(500).json({
        error: error
      })
    }
  },

  async changePhoto(req, res) {
    try {
      const replaceToken = req.headers.authorization.replace('Bearer ', '')
      const decoded = jwt.verify(replaceToken, process.env.TOKEN_SECRET);

      const decodeId = hashids.decode(decoded.id)
      console.log(decoded.id)
      const users = await models.user.findOne({
        attributes: ['id'],
        where: { id: decodeId },
      })

      let photo_file = "profile_" + moment().format('YYYY_MM_DD_HH_mm_ss') + ".png";
      const rootDir = process.cwd();
      let next_path = "/uploads/profile/";

      if (users) {
        if (req.body.imageOld !== 'not_found') {
          try {
            //removed image old
            fs.unlinkSync(rootDir + next_path + req.body.imageOld)
          } catch (err) {
            console.error(err)
          }
        }

        // Base64 to Img
        let base64Image = req.body.photo.split(";base64,").pop();
        let base64Type = req.body.photo.split(";base64,", 1).pop();

        if (base64Type === "data:image/jpeg" || base64Type === "data:image/jpg"
          || base64Type === "data:image/png"
        ) {
          try {
            fs.writeFile(
              rootDir + next_path + photo_file, base64Image, { encoding: "base64" },
              function (err) {
                console.log("File created " + photo_file);
              }
            );

            const updatePhoto = users.update({
              photo: photo_file
            })

            if (updatePhoto) {
              res.status(200).json({
                'message': 'Foto profil berhasil di perbaharui',
                'user': users
              });
            } else {
              res.status(400).json({
                'message': 'Foto profil gagal di perbaharui',
                'user': users
              });
            }
          } catch (error) {
            throw new Error("Failed Create File");
          }
        } else {
          throw new BadRequest("File must be JPG/JPEG/PNG FORMAT");
        }
      }
    } catch (e) {
      console.log(e)
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
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = userController