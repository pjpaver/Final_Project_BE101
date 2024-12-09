import mongoose from "mongoose";

// Define the Item Schema
const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ["Electronics", "Furniture", "Clothing", "Food", "Other"],
    default: "Other",
  },
  quantity: { type: Number, default: 0 },
  price: { type: Number, required: true },
  description: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

// Create and export the model
const Item = mongoose.model("Item", ItemSchema);
export default Item;
