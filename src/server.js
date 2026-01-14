import "dotenv/config"
import express from "express"
// import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";


//Import Routes
import movieRoutes from "./routes/movieRoutes.js" ; 
import authRoutes from "./routes/authRoutes.js"
import watchlistRoutes from "./routes/watchlistRoutes.js"

// config();
connectDB();

const app = express();

// Body parsing middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//API Routes
app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);
app.use("/watchlist", watchlistRoutes);

const PORT = 5055;
app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
