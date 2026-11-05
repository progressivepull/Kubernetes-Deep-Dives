import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

const app = express();
app.use(express.json());
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
let collection;

app.get('/api/health', (_req, res) => res.json({ status: 'ok', database: Boolean(collection) }));
app.get('/api/items', async (_req, res) => {
  try { res.json(await collection.find().sort({ _id: -1 }).toArray()); }
  catch (err) { res.status(500).json({ error: err.message }); }
});
app.post('/api/items', async (req, res) => {
  const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
  if (!name || name.length > 200) return res.status(400).json({ error: 'Name must be 1-200 characters' });
  try {
    const result = await collection.insertOne({ name, createdAt: new Date() });
    res.status(201).json({ _id: result.insertedId, name });
  } catch (err) { res.status(500).json({ error: err.message }); }
});
app.delete('/api/items/:id', async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'Invalid ID' });
  try {
    const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(result.deletedCount ? 204 : 404).end();
  } catch (err) { res.status(500).json({ error: err.message }); }
});

async function start() {
  for (let attempt = 1; attempt <= 30; attempt++) {
    try { await client.connect(); await client.db('appdb').command({ ping: 1 }); collection = client.db('appdb').collection('items'); break; }
    catch (err) { if (attempt === 30) throw err; console.log(`Waiting for MongoDB (${attempt}/30)`); await new Promise(r => setTimeout(r, 2000)); }
  }
  app.listen(3000, '0.0.0.0', () => console.log('API listening on 3000'));
}
start().catch(err => { console.error(err); process.exit(1); });
