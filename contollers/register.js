const handleRegister =(req,res,db,bcrypt,saltRounds)=>{
    const {name,email,password}= req.body;
    if(!name||!email||!password){
        return res.status(404).json('invalid form submitted')
    }
    const hash = bcrypt.hashSync(password, saltRounds);
    db.transaction(trx=>{
        trx.insert({
            hash:hash,
            email:email
        }).into('login')
        .returning('email')
        .then(loginEmail=>{
            return trx('users').returning('*').insert({
                name:name,
                email:loginEmail[0],
                joined: new Date()
            }).then(user=>{
                res.json(user[0])
            })
                })
                .then(trx.commit)
                .catch(trx.rollback)
    })
    .catch(err=> res.status(404).send('UNABLE TO REGISTER'))
}


module.exports={
    handleRegister: handleRegister
}