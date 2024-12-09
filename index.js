import express from "express";
import Item from "./models/item.js";
import mongoose from "mongoose";

//connect to mongoDB
mongoose
  .connect("mongodb://localhost:27017/inventory")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const app = express();
app.set("view engine", "ejs");
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/items", async (req, res) => {
  try {
    const itemData = req.body;
    // const { name, category, quantity, price, description } = req.body;
    const newItem = new Item(itemData);

    const createditem = await newItem.save();

    console.log("createditem:", createditem);

    res.json({ message: "item created successfully", item: createditem });
  } catch (err) {
    console.error("err:", err);
    res.status(400).json({ error: err.message });
  }
}); 

//get all
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    console.error("err:", err);
    res.status(400).json({ error: err.message });
  }
});

//put
app.put("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedItem = await Item.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    res.json(updatedItem);
  } catch (error) {
    console.error("err:", err);
    res.status(400).json({ error: err.message });
  }
});

//delete
app.delete("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Item.findByIdAndDelete(id);

    res.json({ message: "Item deleted successfully", item: deletedItem });
  } catch (error) {
    console.error("err:", err);
    res.status(400).json({ error: err.message });
  }
});

app.get("/items/filter/:category", async (req, res) => {
  try {
    const { category } = req.params;

    let filter = {};
    if (category !== "All") {
      filter.category = category; // Apply category filter
    }
    const items = await Item.find(filter);

    res.json(items);
  } catch (error) {
    console.error("err:", err);
    res.status(400).json({ error: err.message });
  }
});

//server start
app.listen(3005, () => console.log(`Server running at http://localhost:3005`));
