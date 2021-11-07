const db = require('../config/db');
var passwordHash = require('password-hash');
var moment = require('moment'); // require
const jwt = require("jsonwebtoken")

// login
const LoginUser = (request, response) => {
    let email = request.body.email; // menerima value email dari form data
    let pass = request.body.password; // menerima value password dari form data
    // filter data dari data base berdasarkan email yang di masukan 
    db.pool.query(`SELECT * FROM users WHERE email = $1`, [email], (error, results) => {
        if (error) {
            throw error
        }
        // jika data lebih dari 0 berarti email yang di masukan di form ada di database
        if (results.rowCount > 0) {
            let data = {
                    id: results.rows[0].id,
                    name: results.rows[0].name,
                    username: results.rows[0].username,
                    email: results.rows[0].email,
                }
                // lalu cek dulu password benar atau tidak jika tidak ya lempar ke kondisi ke dua jika benar generate token
            if (passwordHash.verify(pass, results.rows[0].password)) {
                let token = jwt.sign(data, 'hacktiv8');
                let decoded = jwt.verify(token, 'hacktiv8');
                response.status(200).json({
                    status: true,
                    message: "login success !",
                    data: data,
                    token: token,
                    hasiltoke: decoded.id

                })
            } else {
                response.status(201).json({
                    status: false,
                    message: 'email & password not valid !'
                })
            }

        } else {
            response.status(201).json('email & password not valid !')
        }

    })
}


// registrasi users
const RegistrasiUser = (request, response) => {
    let name = request.body.name;
    let username = request.body.username;
    let email = request.body.email;
    let password = passwordHash.generate(request.body.password);
    let created = moment().format();
    db.pool.query(`INSERT INTO users (name,username,email,password,created_at) VALUES ('${name}','${username}','${email}','${password}','${created}')`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send({
            message: 'Registrasi success !',
            status: true
        })

    })
}

const cekUser = (email) => {

    db.pool.query(`SELECT * FROM users WHERE email = $1`, [email], (error, results) => {
        if (error) {
            throw error
        }

        if (results.rowCount > 0) {
            return results.rows[0].email
        } else {
            return false;
        }
    })
}


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    console.log(authHeader)
    if (authHeader == null) return res.status(401).send({
        message: 'unAuthorization !',
        status: false
    })

    jwt.verify(authHeader, 'hacktiv8', (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}



module.exports = {
    LoginUser,
    RegistrasiUser,
    cekUser,
    authenticateToken
}