import express from 'express';
import 'dotenv/config';
import appMiddleware from './middleware/index.js';
import sequelize from './utils/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// Uncomment for testing if middleware is causing issues

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Log the static file directory
console.log(
    'Serving static files from: ',
    path.join(__dirname, '..', 'assets')
);

// Serve static files from 'assets' located outside 'src'
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));

app.use(appMiddleware);

sequelize.sync();

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
