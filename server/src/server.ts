import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    console.log('GET request received at /', req.method);
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body);
    console.log('Request Query:', req.query);
    console.log('Request Params:', req.params);
    console.log('Request IP:', req.ip);
  res.send('Farm Labor Management Backend');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});