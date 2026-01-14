import express from "express";
import { addToWatchList } from "../controllers/watchlistController.js"
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add Middleware
router.use(authMiddleware)

router.post("/", addToWatchList);

export default router;