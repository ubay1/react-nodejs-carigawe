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
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      } else {
        const decodeId = hashids.decode(req.body.author_job_id)

        const cekIdIsExist = await models.user.findOne({
          where: { id: decodeId }
        })

        if(cekIdIsExist) {
          const jobs = await models.job.create(
            {
              author_job_id: decodeId,
              content: req.body.content,
              expiredAt: req.body.expiredAt,
            }
          );

          // {
          //   include: [
          //     {
          //       model: models.user,
          //       as: 'user'
          //     }
          //   ]
          // }
          
          console.log(jobs)
  
          // if (jobs) {
          //   res.status(200).json({
          //     'message': 'Lowongan berhasil di publish',
          //     'data': jobs
          //   });
          // } else {
          //   res.status(400).json({
          //     'message': 'Lowongan berhasil di publish',
          //     'data': jobs
          //   });
          // }
        } else {
          return res.status(404).send({
            errors: "user tidak terdaftar."
          });
        }

      }


    } catch(e) {
      console.log(e)
    }
  }
}

module.exports = jobController