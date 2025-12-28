// server/server.js

require('dotenv').config(); // Load environment variables from .env file
//const History = require('./models/History'); // Import the model
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Workflow = require('./models/Workflow'); // Import schema
const History = require('./models/History');
const Order = require('./models/Order');
// ... other imports ...
const multer = require('multer'); // New Import
const XLSX = require('xlsx');     // New Import
const fs = require('fs');
//const MONGO_URI = "mongodb+srv://ashi1mandru:mongodb123@cluster-1.aoxrdsv.mongodb.net/Tribal?appName=Cluster-1";
// Configure Multer for file upload storage

const upload = multer({ dest: 'uploads/' });

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
//app.use(cors()); // Enables cross-origin requests from your frontend
// 1. Determine which URL to allow based on how you started the app
const corsOrigin = process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL_PROD 
    : process.env.FRONTEND_URL_LOCAL;

// 2. Apply the dynamic origin to CORS
app.use(cors({
    origin: corsOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());
//app.use(express.json()); // Allows the server to parse JSON request bodies

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    // Start server only after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

// Define your API routes (for CRUD operations) here
app.get('/', (req, res) => {
  res.send('Server is up and running.');
});
// (Example: app.get('/api/data', async (req, res) => { ... }))



const UserSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  user_name: String,
  user_email_id: String,
  user_department: String,
  user_status: { type: String, default: 'Active' },
});

// The model will be linked to the 'userlogin' collection 
// in your image unless you explicitly call it 'UserInfo' 
// in the code. Let's use 'UserInfo' as requested.
module.exports = mongoose.model('UserInfo', UserSchema, 'UserInfo');
///////////////////////////////////////////////////////////////////////////

// Connect to the MongoDB server using the standard driver for broader access
// --- Database Connection and Setup ---
let client;

async function connectToMongo() {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    client = conn.connection.getClient();
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
}

connectToMongo();

// Helper function to get the MongoDB client
const getDbClient = (res) => {
    if (!client) {
        res.status(503).json({ msg: 'Database client not connected' });
        return null;
    }
    return client;
};


app.get('/api/databases', async (req, res) => {
    const client = getDbClient(res); if (!client) return;
    try {
        const adminDb = client.db().admin();
        const dbList = await adminDb.listDatabases();
        const databaseNames = dbList.databases.map(db => db.name).filter(name => !['admin', 'config', 'local'].includes(name));
       console.log("Connect succesfully to databases")
        res.json(databaseNames);
    } catch (err) { res.status(500).send('Server Error'); }
});

// --- API Endpoints ---

// ... existing code ...
const { ObjectId } = require('mongodb'); // Import ObjectId from the driver (already included via Mongoose client)


app.get('/api/user-ids', async (req, res) => {
    // 1. Get the MongoDB client connection
    const client = getDbClient(res); 
    if (!client) return; // Assuming getDbClient handles errors and sends response if failure

    try {
        // 2. Specify the target database ('test')
        const db = client.db('test');
        
        // 3. Specify the target collection ('user_databases')
        const collection = db.collection('user_databases');

        // 4. Query the collection:
        //    - {} is the query filter (empty means select all documents)
        //    - { user_id: 1, _id: 0 } is the projection
        //        - user_id: 1 means include the user_id field
        //        - _id: 0 means exclude the default _id field
        const userIdsCursor = collection.find({}, { projection: { user_id: 1, _id: 0 } });
        
        // 5. Convert the cursor results into an array
        //    The result will be an array of objects like: [{ user_id: "id1" }, { user_id: "id2" }, ...]
        const userIdsObjects = await userIdsCursor.toArray();

        // 6. Map the array of objects to an array of just the IDs (e.g., ["id1", "id2", ...])
        const userIds = userIdsObjects.map(doc => doc.user_id);

        // 7. Send the resulting array back to the client
        console.log("Successfully retrieved user IDs.");
        res.json(userIds);

    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).send('Server Error retrieving user IDs');
    }
});

// --- API ROUTES ---

// 1. Fetch Databases (Filters out system dbs)
app.get('/api/databases', async (req, res) => {
    const client = getDbClient(res); if (!client) return;
    try {
        const adminDb = client.db().admin();
        const dbList = await adminDb.listDatabases();
        // Return all names, or filter if you prefer
        const databaseNames = dbList.databases
            .map(db => db.name)
            .filter(name => !['admin', 'config', 'local'].includes(name));
        res.json(databaseNames);
    } catch (err) { 
        res.status(500).json({ error: 'Failed to fetch databases' }); 
    }
});

// 2. Create a New Database (Creates an initial collection to make it visible)
app.post('/api/databases', async (req, res) => {
    const client = getDbClient(res); if (!client) return;
    const { newDbName } = req.body;
    if (!newDbName) return res.status(400).send('Database name is required');
    try {
        // In MongoDB, a DB isn't "real" until it has a collection with data
        await client.db(newDbName).createCollection('init');
        res.status(201).json({ msg: `Database '${newDbName}' initialized.` });
    } catch (err) {
        res.status(500).send('Error creating database');
    }
});

// 3. Create a New Collection in a specific DB
app.post('/api/databases/:dbName/collections', async (req, res) => {
    const client = getDbClient(res); if (!client) return;
    const { dbName } = req.params;
    const { newColName } = req.body;
    if (!newColName) return res.status(400).send('Collection name is required');
    try {
        await client.db(dbName).createCollection(newColName);
        res.status(201).json({ msg: `Collection '${newColName}' created in '${dbName}'` });
    } catch (err) {
        res.status(500).send('Error creating collection');
    }
});

// 4. Fetch Collections for a Database
app.get('/api/databases/:dbName/collections', async (req, res) => {
    const client = getDbClient(res); if (!client) return;
    const { dbName } = req.params;
    try {
        const db = client.db(dbName);
        const collections = await db.listCollections().toArray();
        res.json(collections.map(c => c.name));
    } catch (err) { res.status(500).send('Server Error'); }
});

// 5. Excel Upload and Bulk Insert
app.post('/api/databases/:dbName/collections/upload', upload.single('file'), async (req, res) => {
    const client = getDbClient(res); if (!client) return;
    const { dbName } = req.params;
    const { colName } = req.body;
    
    if (!req.file || !colName) return res.status(400).send('File and collection name required');

    try {
        const workbook = XLSX.readFile(req.file.path);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet);

        if (data.length === 0) throw new Error('File is empty');

        const db = client.db(dbName);
        const result = await db.collection(colName).insertMany(data);
        
        fs.unlinkSync(req.file.path); // Delete temp file
        res.status(201).json({ msg: `Inserted ${result.insertedCount} rows` });
    } catch (err) {
        if (req.file) fs.unlinkSync(req.file.path);
        res.status(500).send(err.message);
    }
});

// 6. Delete a single document
app.delete('/api/databases/:dbName/collections/:colName/document/:id', async (req, res) => {
    const client = getDbClient(res); if (!client) return;
    const { dbName, colName, id } = req.params;
    try {
        const result = await client.db(dbName).collection(colName).deleteOne({ _id: new ObjectId(id) });
        res.json({ msg: 'Deleted successfully', count: result.deletedCount });
    } catch (err) { res.status(500).send('Delete failed'); }
});

// 7. Fetch Documents for a specific collection
// Update your GET route in server.js
app.get('/api/databases/:dbName/collections/:colName/documents', async (req, res) => {
    const client = getDbClient(res); if (!client) return;
    const { dbName, colName } = req.params;
    
    try {
        const db = client.db(dbName);
        // Added .sort({ _id: -1 }) to show newest entries first
        const documents = await db.collection(colName)
            .find({})
            .sort({ _id: -1 }) 
    //       .limit(100)
            .toArray();
        res.json(documents);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch documents' });
    }
});

// 8. Insert a single document (Row)
app.post('/api/databases/:dbName/collections/:colName/document', async (req, res) => {
    const client = getDbClient(res); if (!client) return;
    const { dbName, colName } = req.params;
    const documentData = req.body; // This is the formData from your modal

    try {
        const db = client.db(dbName);
        const result = await db.collection(colName).insertOne(documentData);
        
        res.status(201).json({ 
            msg: 'Document added successfully', 
            insertedId: result.insertedId 
        });
    } catch (err) {
        console.error("Error adding document:", err);
        res.status(500).send('Failed to add document to database');
    }
});
// 9. Update a single document (Edit)
app.put('/api/databases/:dbName/collections/:colName/document/:id', async (req, res) => {
    const client = getDbClient(res); if (!client) return;
    const { dbName, colName, id } = req.params;
    const updatedData = { ...req.body };
    
    // Safety: Remove _id from the body so MongoDB doesn't try to overwrite the immutable ID
    delete updatedData._id;

    try {
        const db = client.db(dbName);
        const result = await db.collection(colName).updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedData }
        );

        if (result.matchedCount === 0) return res.status(404).send('Document not found');
        res.json({ msg: 'Document updated successfully' });
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).send('Failed to update document');
    }
});
//10 DELETE a document
app.delete('/api/databases/:dbName/collections/:colName/document/:id', async (req, res) => {
    const { dbName, colName, id } = req.params;
    const client = getDbClient(res); if (!client) return;

    try {
        const db = client.db(dbName);
        const result = await db.collection(colName).deleteOne({ _id: new ObjectId(id) });
        
        if (result.deletedCount === 1) {
            res.json({ msg: "Document deleted successfully" });
        } else {
            res.status(404).json({ msg: "Document not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Failed to delete document" });
    }
});

//11 UPDATE a document (For the Edit functionality)
app.put('/api/databases/:dbName/collections/:colName/document/:id', async (req, res) => {
    const { dbName, colName, id } = req.params;
    const updateData = req.body;
    const client = getDbClient(res); if (!client) return;

    try {
        const db = client.db(dbName);
        // Remove _id from update data to prevent Mongo errors
        const { _id, ...dataWithoutId } = updateData;
        
        await db.collection(colName).updateOne(
            { _id: new ObjectId(id) },
            { $set: dataWithoutId }
        );
        res.json({ msg: "Document updated successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to update document" });
    }
});
//12 DELETE a collection
app.delete('/api/databases/:dbName/collections/:colName', async (req, res) => {
    const client = getDbClient(res); if (!client) return;
    const { dbName, colName } = req.params;

    try {
        const db = client.db(dbName);
        // .drop() is the MongoDB command to delete a collection
        await db.collection(colName).drop();
        res.json({ msg: `Collection '${colName}' deleted successfully` });
    } catch (err) {
        console.error("Delete collection error:", err);
        res.status(500).json({ error: "Failed to delete collection. It might already be gone." });
    }
});

//13 DELETE A DATABASE
app.delete('/api/databases/:dbName', async (req, res) => {
    const client = getDbClient(res); if (!client) return;
    const { dbName } = req.params;
    try {
        await client.db(dbName).dropDatabase();
        res.json({ msg: `Database ${dbName} deleted` });
    } catch (err) {
        res.status(500).send("Failed to delete database");
    }
});

//14 DELETE A COLLECTION
app.delete('/api/databases/:dbName/collections/:colName', async (req, res) => {
    const client = getDbClient(res); if (!client) return;
    const { dbName, colName } = req.params;
    try {
        await client.db(dbName).collection(colName).drop();
        res.json({ msg: `Collection ${colName} deleted` });
    } catch (err) {
        res.status(500).send("Failed to delete collection");
    }
});

// 15 countrow of selected Table 
// app.get('/api/databases/:dbName/collections/:colName/documents', async (req, res) => {
//     const client = getDbClient(res); if (!client) return;
//     const { dbName, colName } = req.params;
    
//     try {
//         const db = client.db(dbName);
//         const collection = db.collection(colName);

//         // Get the actual total count in the database
//         const totalCount = await collection.countDocuments();

//         // Get the documents (limited to 100 for performance)
//         const documents = await collection
//             .find({})
//             .sort({ _id: -1 }) 
//           //  .limit(100)
//             .toArray();

//         // Send both pieces of data back
//         res.json({ documents, totalCount });
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to fetch documents' });
//     }
// });

// 16
// MongoDB Connection

mongoose.connect(MONGO_URI);
//app.post('/api/databases/Tribal/collections/workflow', async (req, res) => {
app.post('/api/workflow', async (req, res) => {
    try {
        const newEntry = new Workflow(req.body);
        await newEntry.save();
        res.status(201).json({ message: "Success", data: newEntry });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//17
// Bulk insert items into 'orders' collection
app.post('/api/orders/bulk', async (req, res) => {
    try {
        // req.body will be the array of item objects
        await Order.insertMany(req.body);
        res.status(201).json({ message: "Items saved successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//18

app.post('/api/history', async (req, res) => {
    try {
        const newHistory = new History(req.body);
        await newHistory.save();
        res.status(201).json({ message: "History saved" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});