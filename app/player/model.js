const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const HASH_ROUND = 10

let playerSchema = mongoose.Schema({
  email: {
    type: String,
    require: [true, 'email harus diisi']
  },
  name: {
    type: String,
    require: [true, 'nama harus diisi'],
    maxLength: [225, "panjang nama harus antara 3 - 225 karakter"],
    minLength: [3, "panjang nama harus antara 3 - 225 karakter"]
  },
  username: {
    type: String,
    require: [true, 'username harus diisi'],
    maxLength: [225, "panjang nama harus antara 3 - 225 karakter"],
    minLength: [3, "panjang nama harus antara 3 - 225 karakter"]
  },
  password: {
    type: String,
    require: [true, 'kata sandi harus diisi']
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  phoneNumber: {
    type: Number,
    require: [true, 'nomor telpon harus diisi'],
    maxLength: [13, "panjang nomor telpon harus antara 9 - 13 karakter"],
    minLength: [9, "panjang nomor telpon harus antara 9 - 13 karakter"]
  },
  password: {
    type: String,
    require: [true, 'kata sandi harus diisi']
  },
  status: {
    type: String,
    enum: ['Y', 'N'],
    default: 'Y'
  },
  avatar: {
    type: String,
  },
  fileName: {
    type: String
  },
  favorit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
}, { timeStamp: true })

// Validate email if it not already exist
playerSchema.path('email').validate(async function(value){
  try {
    const count = await this.model('Player').countDocuments({ email: value })

    return !count;
  } catch (err) {
    throw err
  }

}, attr => `${attr.value} sudah terdaftar`)

// Hash password before data sent
playerSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND)
  next()
})

module.exports = mongoose.model("Player", playerSchema)