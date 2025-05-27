import express, { Router } from "express"
const router = express.Router();
import { getAllNotes,createNote,UpdateNote,DeleteNote,getNoteByid } from '../controllers/notesControllers.js'

// router.post("/",PostANote)

router.get("/",getAllNotes)
router.put("/:id",UpdateNote)
router.post("/",createNote)
router.delete("/:id",DeleteNote)
router.get("/:id",getNoteByid)
export default router;