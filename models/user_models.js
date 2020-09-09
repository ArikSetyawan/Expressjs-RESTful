const mongo = require('mongoose')

const userSchema  = mongo.Schema({
    first_name: {
        type : String,
        require : true
    },
    last_name:{
        type : String,
        require : true
    },
    age:{
        type : Number,
        require : true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true,
    }
})

module.exports = mongo.model("user", userSchema)