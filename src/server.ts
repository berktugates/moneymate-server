import express from "express";
import { json } from "express";
import sequelize from './config/database';
import categoryRoute from "./routes/Category";

const app = express();
app.use(json());
app.use(categoryRoute);

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log('Database tables are synchronized!');
    } catch (error) {
        console.error('Sync error:', error);
    }
};

syncDatabase().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is listening on ${process.env.PORT}`);
    });
});