import Note from '../models/Note.js'

export async function getAllNotes (_,res) { // to show we are not using, proper coding practice ig

    try {
        
        const notes = await Note.find().sort({createdAt:-1}); //newest first for oldest first 1
        res.status(200).json(notes);
        

    } catch (error) {
        
        console.error("Error",error);
        res.status(500).send("Error in getAllNotes function");
        
    }

}

export async function createNote(req,res){
    try {

        const {title,content} = req.body;
        const newNote = new Note({title, content});

        await newNote.save();

        res.status(201).send("New Note Created");
        
    } catch (error) {

        console.error("Error in createNote function",error);
        error.status(500);
        
    }
}

export async function getNoteByid (req,res) {
    try {
        const note = await Note.findById(req.params.id);

        if(!note){
            res.status(404).json({"Message":"Note not found"});
        }
        res.json(note);

    } catch (error) {

        console.error("Error in getNoteByid function",error);
        error.status(500);
        
    }
}

export  async function UpdateNote(req,res){
    try {

        const {title,content} = req.body;
        const UpdatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content},{
            new:true
        });

        if(!UpdatedNote) {
            error.status(404).message("Note not found")
        }
        res.status(200).json({"message":"Updated Succesfully"})

    } catch (error) {

        console.error("Error in UpdateNote function",error);
        error.status(404);
        
    }
}

export async function DeleteNote(req,res) {
    try {
        const DeletedNote = await Note.findByIdAndDelete(req.params.id,{new:true});
        res.status(201).json({"message":"Deleted Succesfully"})

        if(!DeletedNote) {
            error.status(404).message("Note not found")
        }
        
    } catch (error) {

        error.status(500).json({"Message":"Internal Server Error"});
        res.message("Error in DeleteNote function");
        
    }
}

