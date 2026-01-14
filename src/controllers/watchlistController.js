import { prisma } from "../config/db.js";


const addToWatchList = async (req, res)=>{
    const { movieId, status, rating, notes} = req.body;

    // Verify movie exist
    const movie = await prisma.movie.findUnique({
        where: { id: movieId},
    })

    if (!movie){
        return res.status(404).json({error: "Movie not found"})
    }

    // Check if already added
    const existingInWatchlist = await prisma.watchlistItem.findUnique({
        where: {userID_movieId: {
            userID: req.user.id,
            movieId: movieId
        }}
    })

    if(existingInWatchlist) {
        return res.status(400).json({error: "Movie already in the watchlist"});
    }

    const watchlistItem = await prisma.watchlistItem.create({
        data: {
            userID: req.user.id,
            movieId,
            status: status || "PLANNED",
            rating,
            notes
        }
    });
    res.status(201).json({
        status: "Success",
        data: {watchlistItem}
    })
}

export { addToWatchList }