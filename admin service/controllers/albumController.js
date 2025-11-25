import getDataUri from "../configs/dataUrl.js";
import { sql } from "../configs/db.js";
import cloudinary from "../configs/index.js";
import CustomErrorHandler from "../utils/CustomErrorHandler.js";
import TryCatch from "../utils/TryCatch.js";

const albumController = {
    addAlbum: TryCatch(async (req, res, next) => {
        if (req.user?.role !== 'admin') {
            return res.status(403).json({ message: "You are not admin" });
        }

        const { title, description } = req.body;

        const file = req.file;

        if (!file) {
            return next(CustomErrorHandler.NotFound('No file to upload'));
        }

        const fileBuffer = getDataUri(file); // returns Data URI string

        if (!fileBuffer) {
            return next(CustomErrorHandler.NotFound('Failed to generate file buffer'));
        }

        const cloud = await cloudinary.uploader.upload(fileBuffer, {
            folder: 'albums',
        });

        const result = await sql`
      INSERT INTO albums (title, description, thumbnail)
      VALUES (${title}, ${description}, ${cloud.secure_url})
      RETURNING *
    `;

        res.status(200).json({
            message: "Album created successfully",
            success: true,
            album: result[0],
        });
    }),

    addSong: TryCatch(async (req, res, next) => {
        if (req.user?.role !== 'admin') {
            return res.status(403).json({ message: "You are not admin" });
        }

        const { title, description, album } = req.body;

        const isAlbum = await sql`SELECT * FROM albums WHERE id = ${album}`

        if (isAlbum.length === 0) {
            return next(CustomErrorHandler.NotFound('No album with this is'))
        }
        const file = req.file;

        if (!file) {
            return next(CustomErrorHandler.NotFound('No file to upload'));
        }

        const fileBuffer = getDataUri(file); // returns Data URI string

        if (!fileBuffer) {
            return next(CustomErrorHandler.NotFound('Failed to generate file buffer'));
        }

        const cloud = await cloudinary.uploader.upload(fileBuffer, {
            folder: 'songs',
            resource_type: 'video'
        });

        const result = await sql`
        INSERT INTO songs (title,description,audio,album_id) VALUES (${title},${description},${cloud.secure_url},${album})`;

        res.status(200).json({
            message: "Song added successfully",
            success: true,
            album: result[0],
        });

    }),

    addThumbnail: TryCatch(async (req, res, next) => {
        if (req.user?.role !== 'admin') {
            return next(CustomErrorHandler.UnAuthorized("You are not admin"))
        }

        const song = await sql`SELECT * FROM songs WHERE id = ${req.params.id}`
        if (song.length === 0) {
            return next(CustomErrorHandler.NotFound('No song with this is id'))
        }

        const file = req.file;

        if (!file) {
            return next(CustomErrorHandler.NotFound('No file to upload'));
        }

        const fileBuffer = getDataUri(file); // returns Data URI string

        if (!fileBuffer) {
            return next(CustomErrorHandler.NotFound('Failed to generate file buffer'));
        }

        const cloud = await cloudinary.uploader.upload(fileBuffer, {
            folder: 'songs',
            resource_type: 'image'
        });

        const result = await sql`
        UPDATE songs SET thumbnail = ${cloud.secure_url} WHERE id = ${req.params.id} RETURNING * `;
        res.status(200).json({
            message: "Thumbnail added successfully",
            success: true,
            song: result[0],
        });

    }),


    deleteAlbum: TryCatch(async (req, res, next) => {
        if (req.user?.role !== 'admin') {
            return next(CustomErrorHandler.UnAuthorized("You are not admin"))
        }
        const { id } = req.params;

        const isAlbum = await sql`SELECT * FROM albums WHERE id = ${id}`

        if (isAlbum.length === 0) {
            return next(CustomErrorHandler.NotFound('No album with this is id'))
        }


        await sql`DELETE FROM songs WHERE album_id = ${id}`;
        await sql`DELETE FROM albums WHERE id = ${id}`;

        res.json({
            message: 'Album deleted successfully',
        })
    }),
    deleteSong: TryCatch(async (req, res, next) => {
        if (req.user?.role !== 'admin') {
            return next(CustomErrorHandler.UnAuthorized("You are not admin"))
        }
        const { id } = req.params;

        const isAlbum = await sql`SELECT * FROM albums WHERE id = ${id}`

        if (isAlbum.length === 0) {
            return next(CustomErrorHandler.NotFound('No album with this is id'))
        }


        await sql`DELETE FROM songs WHERE id = ${id}`;

        res.json({
            message: 'Song deleted successfully',
        })
    })
};

export default albumController;