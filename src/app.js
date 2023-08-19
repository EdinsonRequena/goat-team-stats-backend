import express from "express";
import mongoose from "mongoose";
import apiRoutes from "./routes/api-routes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((mongoose) => {
    console.log("conectado a la base de datos");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.use("/api", apiRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
