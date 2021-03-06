var mongoose = require('mongoose');
const bcrypt = require('bcrypt');



var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,'please enter the username'],
        unique: true,
        lowercase: true
    },
    password: {
       type: String,
       required: [true, 'Please enter the password']
    },
    confirmPassword: {
        type: String,
        required: [true, 'Password confirmation failed'],
        validate: {
            validator: function(el){
                return el===this.password;
            },
            message: 'Passwords do not match'
        }
    }
});

userSchema.methods.checkPassword = async function(enteredPassword, userPassword){
    return await bcrypt.compare(enteredPassword,userPassword);
  };
  
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,12);
    this.confirmPassword = undefined;
    next();
  });
const User = mongoose.model('User', userSchema);

module.exports =  User;