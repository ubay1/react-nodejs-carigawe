/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const nodemailer = require('nodemailer');
const fs = require('fs');
const mustache = require('mustache');
const hashids = require('../utils/helper')
const models = require('../models');
const moment = require('moment')
const crypto = require('crypto');
const algorithm = "aes-128-cbc";
const salt = "aB090bog4";
const hash = crypto.createHash("sha1");

hash.update(salt);

let key = hash.digest().slice(0, 16);
crypto.createHash('sha256').update(String(crypto.createSecretKey)).digest('base64').substr(0, 32);
const iv = crypto.randomBytes(16);

function encrypt (text) {
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString("hex"), encryptedData: encrypted.toString('hex') };
}

  function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    
    return decrypted.toString();
  }
  

module.exports = {
  async sendVerifyEmail(decoded, req, token) {
    const templateVerify = fs.readFileSync('./helper/templateVerify.html', 'utf8');

    const tokenEmail = moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
    const encryptToken = encrypt(tokenEmail)
    console.log(decrypt(encryptToken))

    const users = await models.user.findOne({
        where: {
          id: hashids.decode(decoded.id)
        }
    })

    if (users) {
        users.update({
            email_verification_token: encryptToken.encryptedData
        })
    }

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'ubay00804@gmail.com',
          pass: '2014140997'
        }
    });

    const id=hashids.decode(decoded.id);
    mailOptions={
        to : req.body.email,
        subject : "Konfirmasi alamat email",
        html : mustache.render(templateVerify, {
            name: decoded.name,
            id: id,
            email: req.body.email,
            token: JSON.stringify(encryptToken)
        })
    }

    transporter.sendMail(mailOptions)
  }
};