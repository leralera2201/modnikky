const {Router} = require('express')
const User = require('../models/userModel')
const {getToken} = require('../util')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const config = require('./../config')
const sgMail = require('@sendgrid/mail');

const router =new Router()




sgMail.setApiKey(config.SENDGRID_API_KEY);


router.post('/signin',  (req, res) => {
    const {email, password} = req.body
    User.findOne({
        email: email
    }).then(signinUser => {
        if (signinUser) {
            bcrypt.compare(password, signinUser.password, function(err, result) {
                if(result){
                    return res.json({
                        _id: signinUser.id,
                        name: signinUser.name,
                        surname: signinUser.surname,
                        email: signinUser.email,
                        isAdmin: signinUser.isAdmin,
                        token: getToken(signinUser),
                    });
                }
                res.status(401).json({ message: 'Invalid Email or Password.' });
            });

        } else {
            res.status(401).json({ message: 'Invalid Email or Password.' });
        }
    }).catch(err => console.log(err))
});


router.post('/register', (req,res) => {
    const {email, password, surname, name} = req.body
    User.findOne({
        email: email
    }).then(signinUser => {
        if(signinUser) {
            res.status(409).json({message: 'User already exists'})
        }else{
            bcrypt.hash(password, 12, function (err, hash) {
                if(err){
                    console.log(err)
                }
                const user = new User({
                    name,
                    surname,
                    email,
                    password: hash,
                });

                user.save()
                    .then(newUser => {
                        if (newUser) {
                            const msg = {
                                to: newUser.email,
                                from: 'leravodancuk@gmail.com', // Use the email address or domain you verified above
                                subject: 'Signup success',
                                text: 'Thank you for registration!',
                                html: '<h3>Welcome to Modnikky</h3>',
                            };

                            sgMail
                                .send(msg)
                                .then(() => {}, error => {
                                    console.error(error);

                                    if (error.response) {
                                        console.error(error.response.body)
                                    }
                                });
                            res.json({
                                _id: newUser.id,
                                name: newUser.name,
                                surname: newUser.name,
                                password: newUser.password,
                                email: newUser.email,
                                isAdmin: newUser.isAdmin,
                                token: getToken(newUser),
                            });

                        }else{
                            res.status(401).json({message: 'Invalid User Data.'})
                        }
                    })
                    .catch(err => console.log(err))
            })
        }
    })
        .catch(err => console.log(err))



})

router.post('/reset-password', (req,res) => {
    crypto.randomBytes(32, (err, buf) => {
        if(err){
            console.log(err)
        }
        const token = buf.toString('hex')
        User.findOne({email: req.body.email}).then(user => {
            if(!user){
                return res.status(422).json({error: 'User does not exist with this email'})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save().then(user => {
                const msg = {
                    to: user.email,
                    from: 'leravodancuk@gmail.com', // Use the email address or domain you verified above
                    subject: 'Password reset',
                    html: `<p>You requested for password reset</p>
                            <h5>Click on this <a href="http://localhost:3000/reset/${token}">link</a> to reset password</h5>`
                };
                sgMail
                    .send(msg)
                    .then(() => {}, error => {
                        console.error(error);
                        if (error.response) {
                            console.error(error.response.body)
                        }
                    })
                res.json({message: 'Check your email'})
            })
        })
    })
})

router.post('/new-password', (req,res) => {
    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({resetToken: sentToken, expireToken: {$gt: Date.now()}})
        .then(user => {
            if(!user){
                return res.status().json({error: 'Session expired. Try again'})
            }
            bcrypt.hash(newPassword, 12).then(hashedPassword => {
                user.password = hashedPassword
                user.resetToken = undefined
                user.expireToken = undefined
                user.save().then(newUser => {
                    res.json({message: 'Password updated successfully'})
                })
            })
        })
        .catch(err => console.log(err))
})

// router.get('/createadmin',  (req,res)=> {
//     try{
//         bcrypt.hash('123456', 12, function (err, hash) {
//             const user = new User({
//                 name: 'Lera',
//                 surname: 'Vodianchuk',
//                 email: 'test@gmail.com',
//                 password: hash,
//                 isAdmin: true
//             })
//             user.save().then(newUser => res.send(newUser))
//         })
//
//     } catch (e) {
//         res.send({message: e.message})
//     }
//
// })

module.exports = router
