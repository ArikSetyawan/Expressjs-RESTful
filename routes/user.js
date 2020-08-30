const express = require('express')
const router = express.Router()
const User = require("../models/models")

router.get('/users/', async (req, res) => {
    try {
        const queryparams = req.query
        if (!queryparams.id_user) {
            const query_user = await User.find()
            let data_user = []
            query_user.forEach((item ) => {
                let data = {
                    id: item._id,
                    first_name: item.first_name,
                    last_name: item.last_name,
                    age: item.age,
                    email: item.email,
                    password: item.password 
                }
                data_user.push(data)
            })
            return res.json(data_user)    
        } else {
           const query_user = await User.findOne({_id:queryparams.id_user})
           if (query_user === null) {
               return res.json({msg:"no user found"})
           } else {
            //    console.log(query_user)
               let data_user = {
                    id: query_user._id,
                    first_name: query_user.first_name,
                    last_name: query_user.last_name,
                    age: query_user.age,
                    email: query_user.email,
                    password: query_user.password
               }
               return res.json({msg:data_user})
           }
        }
    } catch (error) {
        return res.json({msg:error})
    }
})

router.post('/users/', async (req, res) => {
    // console.log(req.body)
    // return res.json(req.body)
    if (!req.body.first_name || !req.body.last_name || !req.body.age || !req.body.email || !req.body.password) {
        return res.status(400).json({msg:"Please fill first_name, last_name, age, email, and password"})
    } else {
        const user = new User({
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            age : req.body.age,
            email : req.body.email,
            password : req.body.password
        })
        try {
            const saveUser = await user.save()
            return res.json(saveUser)
        } catch (error) {
            return res.json({msg:error})
        }
    }
})

router.put('/users/', async (req, res) => {
    if (!req.body.id_user || !req.body.first_name || !req.body.last_name || !req.body.age || !req.body.email || !req.body.password) {
        return res.status(400).json({msg:"Please fill id_user, first_name, last_name, age, email, and password"})
    } else{
        try{
            let update_user = await User.updateOne({_id:req.body.id_user},{$set:{first_name:req.body.first_name,last_name:req.body.last_name,age:req.body.age,email:req.body.email,password:req.body.password}})
            return res.json({update_user})
        } catch(error){
            return res.json({msg:error})
        }
    }
})

router.delete("/users/", async (req, res) => {
    try {
        const queryparams = req.query
        if (!queryparams.id_user) {
            res.json({msg:"id_user is required"})
        } else {
            let delete_user = await User.remove({_id:queryparams.id_user})
            res.json({msg:delete_user})
        }
    } catch (error) {
        res.json({msg:error})
    }
})

module.exports = router