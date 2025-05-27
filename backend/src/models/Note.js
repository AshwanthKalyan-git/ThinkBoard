import express from 'express';
import mongoose from 'mongoose'

//step1 create a schema
//step2 create a model off of that schema

const NoteSchema = new mongoose.Schema(
    {
        title: {
            type:String,
            required:true
        },
        content: {
            type:String,
            required:true,
        }
    },
    {timestamps:true}
);

const Note = mongoose.model("Note",NoteSchema);

export default Note