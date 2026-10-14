const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');


const app = express();
const PORT = 3000;


// Middleware to parse JSON and URL-encoded form data (POST request handling)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// MongoDB Connection Setup
const mongoUrl = 'mongodb://127.0.0.1:27017';
const dbName = 'storeDB';
let db, products;


MongoClient.connect(mongoUrl)
  .then((client) => {
    db = client.db(dbName);
    products = db.collection('products');
    console.log('Connected to MongoDB');
  })
  .catch((err) => console.error('MongoDB connection error:', err));


// ==========================================
// 1. FRONTEND WEBPAGE (HTML UI)
// ==========================================
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Product Management (CRUD)</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 30px; }
        form { margin-bottom: 20px; }
        input { margin: 5px; padding: 8px; }
        button { padding: 8px 12px; cursor: pointer; }
        table { border-collapse: collapse; width: 100%; margin-top: 20px; }
        th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
      </style>
    </head>
    <body>
      <h2>Product Management System</h2>


      <!-- Create Product Form (POST) -->
      <h3>Add New Product</h3>
      <form action="/api/products" method="POST">
        <input type="text" name="name" placeholder="Product Name" required />
        <input type="number" name="price" placeholder="Price" required />
        <button type="submit">Add Product</button>
      </form>


      <!-- Display Products (GET) -->
      <h3>Product List</h3>
      <button onclick="fetchProducts()">Load / Refresh Products</button>
      <table id="productTable">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Price</th><th>Actions</th>
          </tr>
        </thead>
        <tbody id="tableBody"></tbody>
      </table>


      <script>
        // READ (GET)
        async function fetchProducts() {
          const res = await fetch('/api/products');
          const data = await res.json();
          const tbody = document.getElementById('tableBody');
          tbody.innerHTML = '';
          data.forEach(p => {
            tbody.innerHTML += \`
              <tr>
                <td>\${p._id}</td>
                <td>\${p.name}</td>
                <td>$\${p.price}</td>
                <td>
                  <button onclick="updateProduct('\${p._id}')">Edit Price</button>
                  <button onclick="deleteProduct('\${p._id}')">Delete</button>
                </td>
              </tr>\`;
          });
        }


        // UPDATE (PUT)
        async function updateProduct(id) {
          const newPrice = prompt("Enter new price:");
          if (!newPrice) return;
          await fetch(\`/api/products/\${id}\`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ price: parseFloat(newPrice) })
          });
          fetchProducts();
        }


        // DELETE (DELETE)
        async function deleteProduct(id) {
          if (!confirm("Delete this product?")) return;
          await fetch(\`/api/products/\${id}\`, { method: 'DELETE' });
          fetchProducts();
        }


        fetchProducts();
      </script>
    </body>
    </html>
  `);
});


// ==========================================
// 2. HTTP REQUEST HANDLERS & CRUD ENDPOINTS
// ==========================================


// [READ - GET] Fetch all products
app.get('/api/products', async (req, res) => {
  try {
    const list = await products.find().toArray();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// [CREATE - POST] Add a new product (handles both JSON and HTML Form submission)
app.post('/api/products', async (req, res) => {
  try {
    const { name, price } = req.body;
    const newProduct = { name, price: parseFloat(price) };
    await products.insertOne(newProduct);


    // Redirect to home page if submitted via HTML form, else return JSON
    if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
      res.redirect('/');
    } else {
      res.status(201).json({ message: 'Product created successfully', product: newProduct });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// [UPDATE - PUT] Update product price by ID
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { price } = req.body;
    await products.updateOne(
      { _id: new ObjectId(id) },
      { $set: { price: parseFloat(price) } }
    );
    res.json({ message: 'Product updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// [DELETE - DELETE] Remove a product by ID
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await products.deleteOne({ _id: new ObjectId(id) });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
