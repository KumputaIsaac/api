const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const register = require('./contollers/register')
const signin = require('./contollers/signin')
const profile = require('./contollers/profile')
const image = require('./contollers/image')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'maduskii1',
      database : 'facerecognition'
    }
  });

const app = express();

app.use(bodyParser.json())
app.use(cors())

// db.select('*').from('users').then(data=>{
//     console.log(data)
// })



app.get('/', (req,res)=>{
    res.send('welcome')
})
// signin 

app.post('/signin', (req,res)=> signin.handleSignin(req,res,db,bcrypt))

// register 
 
app.post('/register',(req,res)=> {register.handleRegister(req,res,db,bcrypt,saltRounds)})



app.get('/profile/:id', (req,res)=> {profile.handleProfile(req,res,db)})

app.put('/image', (req,res)=> {image.handleImage(req,res,db)})

const PORT = process.env.PORT

app.listen(3000,()=>{
    console.log(`server is running on ${3000}`)
}) 