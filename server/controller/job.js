/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const models = require('../models');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
// get config vars
dotenv.config();
const moment = require('moment')

const hashids = require('../utils/helper')

const jobController = {
  async postJob(req, res) {
    try {
      const replaceToken = req.headers.authorization.replace('Bearer ', '')
      const decoded = jwt.verify(replaceToken, process.env.TOKEN_SECRET);

      const decodeId = hashids.decode(decoded.id)
      console.log(decoded.id)
      const cekIdIsExist = await models.user.findOne({
        attributes: ['id'],
        where: { id: decodeId },
      })

      if(cekIdIsExist) {
        // return res.status(200).json(cekIdIsExist)
        const jobs = await models.job.create(
          {
            userId: decodeId,
            title: req.body.title,
            image_content: req.body.image_content,
            content: req.body.content,
            city: req.body.city,
            expiredAt: req.body.expiredAt,
          }
        );
      
        if (jobs) {
          res.status(200).json({
            'message': 'Lowongan berhasil di publish',
            'data': jobs
          });
        } else {
          res.status(400).json({
            'message': 'Lowongan gagal di publish',
            'data': null
          });
        }
      } else {
        return res.status(404).send({
          errors: "user tidak terdaftar."
        });
      }
    } catch(e) {
      console.log(e)
    }
  },
  async getAllJob(req, res) {
    try {
      const jobs = await models.job.findAll({
        attributes: ['content','image_content','title','city','expiredAt', 'createdAt'],
        include: [{model: models.user, attributes:['name', 'photo', 'gender']}]
      })

      // const filterJobs = jobs.map((item) => {
      //   return {
      //     id: hashids.encode(item.id),
      //     userId: hashids.encode(item.userId),
      //     content: item.content,
      //     createdAt: item.createdAt,
      //     expiredAt: item.expiredAt,
      //     user: {
      //       name: item.user.name,
      //       photo: item.user.photo,
      //       gender: item.user.gender,
      //     }
      //   }
      // })

      res.status(200).json({
        message: "data tersedia",
        totalData: jobs.length,
        data: jobs,
      })
    } catch (error) {
      res.status(500).json({
        error: error
      })
    }
  },
  async getJobUser(req, res) {
    try {
      const replaceToken = req.headers.authorization.replace('Bearer ', '')
      const decoded = jwt.verify(replaceToken, process.env.TOKEN_SECRET);

      // return res.send (decoded)

      const jobs = await models.job.findAll({
        where: {userId: hashids.decode(decoded.id)},
        attributes: ['content','image_content','title','city','expiredAt', 'createdAt'],
        include: [{model: models.user, attributes:['name', 'photo', 'gender']}]
      })

      res.status(200).json({
        message: "data tersedia",
        totalData: jobs.length,
        data: jobs,
      })
    } catch (error) {
      res.status(500).json({
        error: error
      })
    }
  }
}

module.exports = jobController