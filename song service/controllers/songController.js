import { STATUS_OK } from "../configs/index.js";
import { sql } from "../configs/db.js";
import TryCatch from "../utils/TryCatch.js"

const songController = {
    getAllAlbum: TryCatch(async (req, res) => {
        let albums;
        albums = await sql`SELECT * FROM albums`;
        res.status(STATUS_OK).json(albums)
    }),
    getAllSongs: TryCatch(async (req, res) => {
        let songs;
        songs = await sql`SELECT * FROM songs`;
        res.status(STATUS_OK).json(songs)
    }),
    getSingleSongs: TryCatch(async (req, res) => {
        let songs;
        songs = await sql`SELECT * FROM songs WHERE id = ${req.params.id}`;
        res.status(STATUS_OK).json(songs[0])
    }),

   getAllSongsOfAlbum: TryCatch(async (req, res) => {
    const { id } = req.params;

    let album = await sql`SELECT * FROM albums WHERE id = ${id}`;
    if (album.length === 0) {
        return res.status(404).json({ message: 'No album with this id' });
    }

    let songs = await sql`SELECT * FROM songs WHERE album_id = ${id}`;
    res.json({ songs, album: album[0] });
}),


}

export default songController