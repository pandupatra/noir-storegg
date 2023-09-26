const mongoose = require('mongoose')
let paymentSchema = mongoose.Schema({
  type: {
    type: String,
    require: [true, 'tipe pembayaran harus diisi']
  },
  status : {
    type: String,
    enum : ['Y', 'N'],
    default: 'Y'
  },
  banks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bank"
    }
  ]
}, { timeStamp: true })

module.exports = mongoose.model("Payment", paymentSchema)