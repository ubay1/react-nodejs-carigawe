/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const models = require('../models');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv"); 
const path = require("path") 
const fs = require('fs-extra')
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

      let photo_file = "jobs_" + moment().format('YYYY_MM_DD_HH_mm_ss') + ".png";
      const rootDir = process.cwd();
      let next_path = "/uploads/jobs/";

      if(cekIdIsExist) {
        // Base64 to Img
        let base64Image = req.body.image_content.split(";base64,").pop();
        let base64Type = req.body.image_content.split(";base64,", 1).pop();
        if (base64Type === "data:image/jpeg" || base64Type === "data:image/jpg" || base64Type === "data:image/png") {
            try {
                fs.writeFile(
                  rootDir + next_path + photo_file, base64Image, { encoding: "base64" }, 
                  function (err) {
                    console.log("File created "+photo_file);
                  }
                );
                
                const jobs = models.job.create(
                  {
                    userId: decodeId,
                    title: req.body.title,
                    image_content: photo_file,
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
            } catch (error) {
                throw new Error("Failed Create File");
            }
        } else {
            throw new BadRequest("File must be JPG/JPEG/PNG FORMAT");
        }
      } 
    } catch(e) {
      console.log(e)
    }
  },
  async getAllJob(req, res) {
    try {
      const jobs = await models.job.findAll({
        attributes: ['id','content','image_content','title','city','expiredAt', 'createdAt'],
        include: [
          {model:models.user, attributes:['name', 'photo', 'gender']},
          {model:models.like, 
            attributes:[['id', 'like_id'],'like' ], 
            include:[{model: models.user, attributes: ['name', 'photo']}]
          }
        ],
        order: [
          ['id', 'DESC'],
        ],
      })

      // socket.io.emit("FromAPI", "hello from controller");

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
        attributes: ['id','content','image_content','title','city','expiredAt', 'createdAt'],
        include: [
          {model:models.user, attributes:['name', 'photo', 'gender']},
          {model:models.like, 
            attributes:['like' ], 
            include:[{model: models.user, attributes: ['name', 'photo']}]
          }
        ],
        order: [
          ['id', 'DESC'],
        ],
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
  },
  async likeJob(req, res) {
    try{
      const replaceToken = req.headers.authorization.replace('Bearer ', '')
      const decoded = jwt.verify(replaceToken, process.env.TOKEN_SECRET);
      const decodedId = hashids.decode(decoded.id)
      const jobId = req.body.job_id
      
      const users = await models.user.findOne({
        where: {
          id: decodedId
        },
        attributes: [
          "name", "phone", "email", "email_verif", "photo", "background_image", "gender", "recruiter", "job_seeker",
        ]
      })

      if (users.recruiter === true) {
        res.status(400).json({
          message: "anda tidak mendapat akses",
        })
      } else {
        console.log(jobId, decodedId)
        const likess = await models.like.create(
          {
            jobId: jobId,
            userId: decodedId,
            like: true
          }
        );
        
        if (likess) {
          res.status(200).json({
            message: "anda telah memberikan like",
          })
        }
      }
      
    } catch(error) {
      console.log(error)
    }
  },
  async unlikeJob(req, res) {
    try{
      const replaceToken = req.headers.authorization.replace('Bearer ', '')
      const decoded = jwt.verify(replaceToken, process.env.TOKEN_SECRET);
      const decodedId = hashids.decode(decoded.id)
      const likeId = req.body.like_id
      
      const users = await models.user.findOne({
        where: {
          id: decodedId
        },
        attributes: [
          "name", "phone", "email", "email_verif", "photo", "background_image", "gender", "recruiter", "job_seeker",
        ]
      })

      if (users.recruiter === true) {
        res.status(400).json({
          message: "anda tidak mendapat akses",
        })
      } else {
        console.log(likeId, decodedId)
        const like = await models.like.findOne({
          where:{
            id: likeId
          }
        });

        if (like) {
          like.destroy()
          res.status(200).json({
            message: "anda batal memberikan like",
          })
        }
      }
      
    } catch(error) {
      console.log(error)
    }
  }
}

module.exports = jobController