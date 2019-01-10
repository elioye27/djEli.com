const express = require('express');
const nodemailer = require ('nodemailer');
const router = express.Router();
const db = require('../models');

router.get('/', function(req, res) {
  res.render('index', {})
});

// added for nodemailer 08/14/18
router.post('/send', (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
          user: 'apikey', // generated ethereal user
          pass: '' // generated ethereal password
      },
      // if not in production, add below and comma to above bracket.
      tls:{
        rejectUnauthorized:false
      }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Dj-Eli Website" <eoyebobola@dj-eli.com>', // sender address
      to: 'elioye27@gmail.com', // list of receivers
      subject: 'Contact Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('index', {msg:'Email has been sent'});
  });
});
// End of Nodemailer 

router.get('/user/reserved', function(req, res) {
  db.user.findAll({})
  .then(function(result) {
      res.render('reserved', { user: result})
  })
  .catch(function(err){
    res.json(err)
  })
});

router.get('/user/contract', function(req, res) {
  db.book.findAll({})
  .then(function(result) {
    res.render('contract', { books: result })
  })
  .catch(function(){
    res.json('error')
  })
});

router.get('/api/login/:email', function(req, res) {
  db.user.findAll({
    where: {
      email: req.params.email
    }
  })
  .then(function(result) {
    res.json(result);
  })
  .catch(function(){
    res.json('error')
  })
});

router.post('/api/new', function(req, res) {
  db.user.create(req.body)
  .then(function(result) {
    res.redirect("/user/" + req.body.user_type);
  })
  .catch(function(){
    res.json('error')
  })
});

router.get('/table/:id', function(req, res) {
  db.user.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(function(result) {
    res.json(result)
  })
  .catch(function(){
    res.json('error')
  })
});

router.post('/api/book', function(req, res) {
  db.book.create(req.body)
  .then(function(result) {
  })
  // Add Nodemailer 08/15/2018
    const output = `
    <h2>Thank you for booking your event with DJ Eli</h2>
    <p>This email is to confirm your event date</p>
    <b><em>Please be sure to initial and print or save the copy of the contract online</b></em>
    <hr>
    <h3>Details</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
      <li>Event Date: ${req.body.date}</li>
      <li>Start Time: ${req.body.startTime}:00 PM</li>
      <li>End Time: ${req.body.endTime}:00 PM</li>
      <li>Address: ${req.body.address}</li>
      <li>Deposit:$${req.body.deposit}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    <p>Yours truly,</p>
    <h1><em>DJ Eli</h1></em>
  `;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
          user: 'apikey', // generated ethereal user
          pass: '' // generated ethereal password
      },
      // if not in production, add below and comma to above bracket.
      tls:{
        rejectUnauthorized:false
      }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Elijah Oyebobola" <eoyebobola@dj-eli.com>', // sender address
      to: req.body.email, // list of receivers
      bcc: 'elioye27@gmail.com',
      subject: 'DJ Event Booked', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      res.redirect("/user/contract");
  })
  // End of Nodemailer
});

router.put('/api/book/:id', function(req, res) {
  db.book.update({
    name: req.body.name,
    hours: req.body.hours,
    email: req.body.email,
    address: req.body.address,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    deposit: req.body.deposit,
    totalAmt: req.body.totalAmt,
    balDue: req.body.balDue,
    phone: req.body.phone,
    date: req.body.date
  },{
    where: {
      id: req.params.id
    }
  })
  .then(function(result) {
     res.redirect("/user/reserved");
  })
  .catch(function(){
    res.json('error')
  })
});

router.delete('/api/book/:id', function(req, res) {
  db.book.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(function(result) {
     res.json(result);
  })
  .catch(function(){
    res.json('error')
  })
});

router.get('/api/books/all', function(req, res) {
  db.book.findAll({})
  .then(function(results) {
    res.json(results);
  })
  .catch(function(){
    res.json('error')
  })
});

router.get('/api/books/:userId', function(req, res) {
  res.json(`USER ${req.params.userId} BOOKS`)
});

module.exports = router;