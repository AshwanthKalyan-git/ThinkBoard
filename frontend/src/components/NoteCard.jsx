import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../lib/utils';
import api from '../lib/axios';
import toast from 'react-hot-toast';

const NoteCard = ({ note, onDelete, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    e.preventDefault();

    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      console.log('Deleting note with ID:', id);
      await api.delete(`/notes/${id}`);
      toast.success('Note deleted successfully!');
      setNotes((prev) => prev.filter((note) => note._id !== id));
      onDelete?.(id);
    } catch (error) {
      console.error('Delete error:', error.response?.status, error.response?.data);
      toast.error(error.response?.data?.message || 'Failed to delete note');
    }
  };

  return (
    <div className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]">
      <Link to={`/note/${note._id}`} className="contents">
        <div className="card-body">
          <h3 className="card-title text-base-content">{note.title}</h3>
          <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        </div>
      </Link>

      <div className="card-actions justify-between items-center p-4 pt-0">
        <span className="text-sm text-base-content/60">{formatDate(new Date(note.createdAt))}</span>
        <div className="flex items-center gap-2">
          <Link
            to={`/note/${note._id}`} // Changed to /note/:id
            className="btn btn-ghost btn-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <PenSquareIcon className="size-4" />
          </Link>
          <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e, note._id)}>
            <Trash2Icon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;