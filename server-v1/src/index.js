import express from 'express';
import 'dotenv/config';
import appMiddleware from './middleware/index.js';
import sequelize from './utils/db.js';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(appMiddleware);

sequelize.sync();

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
