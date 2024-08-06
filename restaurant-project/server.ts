import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 5000;
const MONGO_URI = 'mongodb+srv://gameble01:h2fN1jqqUV1R0Ktg@cluster0.yarddsk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

interface Users extends mongoose.Document {
  first_name: string;
  surname: string;
  email: string;
  password: string;
}

const usersSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const ItemModel = mongoose.model<Users>('Users', usersSchema);

app.post('/users', async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const newItem = new ItemModel({ name, description });
  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/items', async (req: Request, res: Response) => {
  try {
    const items = await ItemModel.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/items/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const updatedItem = await ItemModel.findByIdAndUpdate(id, { name, description }, { new: true });
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/items/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedItem = await ItemModel.findByIdAndDelete(id);
    res.status(200).json(deletedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));