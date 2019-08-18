const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    
    validate(value){
      if(!validator.isEmail(value)) {
        throw new Error('Please provide valid email')
      }
    }
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true  
  },
  tokens: [{token: {
    type: String,
    required: true
  }}]
})

userSchema.virtual('newsitems', {
  ref: 'NewsItem',
  localField: '_id',
  foreignField: 'owner'
})

userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject
}

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)
  user.tokens = user.tokens.concat({token})
  await user.save()
  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({email})
  if(!user){
    throw new Error('User was not found')
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if(!isMatch){
    throw new Error('Wrong password')
  }
  return user;
}

userSchema.pre('save', async function(next) {
  const user = this;

  if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User;