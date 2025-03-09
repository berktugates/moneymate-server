import express from "express";
import { json } from "express";
import sequelize from "./config/database";
import authMiddleware from "./middleware/auth";
import userRoute from "./routes/User";
import categoryRoute from "./routes/Category";
import incomeRoute from "./routes/Income";
import spendingRoute from "./routes/Spending";
import dotenv from "dotenv"

dotenv.config();

const app = express();
app.use(json());
app.use(userRoute);
app.use(categoryRoute);
app.use(incomeRoute);
app.use(spendingRoute);

app.get("/protected", authMiddleware, (req, res) => {
  res.send("This is a protected route.");
});

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Database tables are synchronized!");
  } catch (error) {
    console.error("Sync error:", error);
  }
};

syncDatabase().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is listening on ${process.env.PORT}`);
  });
});
