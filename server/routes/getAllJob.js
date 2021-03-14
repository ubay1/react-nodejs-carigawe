/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const models = require('../models');

module.exports = function(io) {

    let idSocket = ''

    io.sockets.on("connection",function(socket){
        idSocket = socket.id
        console.log("Server-Client Connected!", idSocket);
    });

    router.post('/get_all_post_job_socket', async (req, res) => {
        // res.send(req.body.email)
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
            
            res.status(200).json({
                message: "data tersedia",
                totalData: jobs.length,
                data: jobs,
            })

            // emit data ke home, buat update data terbaru
            io.emit('getNewDataJob', jobs);
        } catch(error) {
            console.log(error)
        }

        // sendResponse = function (data) {
        //     return res.status(200).json({"text": "Success", "response": data.data});
        // }
    });

    return router;

};

// module.exports = router