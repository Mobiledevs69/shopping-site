const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const { isAdmin } = require('../middleware/auth')

router.use((req, res, next) => {
  res.locals.user = req.user || null; // Assuming you store user info in the session
  next();
});

router.get('/', isAdmin, (req, res) => {
  res.render('admin', { title: "Admin Dashboard" });
});

// Display all products
router.get('/products', isAdmin, async (req, res) => {
  const products = await Product.find();
  res.render('products/index', { products, title: "All Products" });
});

// Render form to create a new product
router.get('/products/new', isAdmin, (req, res) => {
  res.render('products/new', { title: "Create new product" });
});

// Handle new product creation
router.post('/products', isAdmin, async (req, res) => {
  const { name, price, description } = req.body;
  const product = new Product({ name, price, description });
  await product.save();
  res.redirect('/products');
});

// Render form to edit a product
router.get('/products/:id/edit', isAdmin, async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('products/edit', { product, title: "Edit product" });
});

// Handle product update
router.post('/products/:id', isAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  await Product.findByIdAndUpdate(id, { name, price, description });
  res.redirect('/products');
});

// Delete a product
router.post('/products/:id/delete', isAdmin, async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect('/admin/products');
});

module.exports = router
