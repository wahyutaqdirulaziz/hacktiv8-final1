const db = require('../config/db');
const jwt = require("jsonwebtoken");
const moment = require('moment'); // require
const { v4: uuidv4 } = require('uuid');



const Getreflections = (request, response) => {
    const token = request.headers['authorization']
    let decoded = jwt.verify(token, 'hacktiv8');
    db.pool.query(`SELECT * FROM reflections WHERE owner_id = $1`, [decoded.id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const GetreflectionsById = (request, response) => {
    const id = request.params.id
    const token = request.headers['authorization']
    let decoded = jwt.verify(token, 'hacktiv8');

    pool.query('SELECT * FROM reflections WHERE id = $1 AND WHERE owner_id = $2', [id, decoded.id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const Createreflections = (request, response) => {
    const token = request.headers['authorization']
    let decoded = jwt.verify(token, 'hacktiv8');
    let succes = request.body.success;
    let low_poin = request.body.low_point;
    let take_awa = request.body.take_away;
    let owner_i = decoded.id;

    db.pool.query(`INSERT INTO reflections (id, success, low_point, take_away,owner_id, created_at,updated_at)
    VALUES ('${uuidv4()}', '${succes}', '${low_poin}', '${take_awa}','${owner_i}', '${moment().format()}',null);`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send({
            message: 'reflections created success !',
            status: true
        })

    })
}


const updatereflections = (request, response) => {
    const id = request.params.id;
    let success = request.body.success;
    let low_point = request.body.low_point;
    let take_away = request.body.take_away;
    db.pool.query(
        'UPDATE reflections SET success = $1, low_point = $2 ,take_away = $3,updated_at = $5 WHERE id = $4', [success, low_point, take_away, id, moment().format()],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send({
                message: 'reflections update success !',
                status: true
            })
        }
    )
}


const deletereflections = (request, response) => {
    const id = request.params.id

    db.pool.query('DELETE FROM reflections WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send({
            message: 'reflections delete success !',
            status: true
        })
    })
}


module.exports = {
    Getreflections,
    GetreflectionsById,
    Createreflections,
    updatereflections,
    deletereflections
}