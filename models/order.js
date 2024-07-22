const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderId: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  phone: { type: String },
  address: { type: String },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  amount: { type: Number, required: true },
  status: { type: String, default: "Pending" },
  transactionId: { type: String, required: true },
  data: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
