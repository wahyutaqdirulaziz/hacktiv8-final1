const express = require('express')
const app = express()
const route = require("express").Router()
const reflections = require('./controllers/reflections')
const users = require('./controllers/User')
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(route)

app.get('/', (req, res) => {
    res.send('reflections aplication final project hacktiv8')
})

app.post('/login', users.LoginUser)
app.post('/register', users.RegistrasiUser)

app.get('/reflections', users.authenticateToken, reflections.Getreflections)
app.post('/reflections', users.authenticateToken, reflections.Createreflections)
app.put('/reflections/:id', users.authenticateToken, reflections.updatereflections)
app.delete('/reflections/:id', users.authenticateToken, reflections.deletereflections)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})