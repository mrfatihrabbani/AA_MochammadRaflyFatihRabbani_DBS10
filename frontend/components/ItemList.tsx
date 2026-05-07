import { useState } from "react";
import { FaTrash } from "react-icons/fa";  

interface ItemProps {
  todolist: any;
  onToggle: any;
  onDelete: any;
  onUpdateText: any;
}

function ItemList({ todolist, onToggle, onDelete, onUpdateText }: ItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todolist.text);

  const getTextClass = () => {
    if (todolist.done) {
      
      return "text-gray-800 flex-1 line-through text-gray-400";
    }
    return "text-gray-800 flex-1";
  };

  const handleToggle = () => {
    if (!todolist.done) {
      setIsCelebrating(true);
      setTimeout(() => setIsCelebrating(false), 600);
    }
    onToggle(todolist.id, todolist.done, todolist.text);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      onDelete(todolist.id);
    }, 300); 
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editText.trim() && editText !== todolist.text) {
      onUpdateText(todolist.id, editText, todolist.done);
    }
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={todolist.done}
          onChange={handleToggle}
          className={`w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer transition-all duration-200 ${
            isCelebrating ? "animate-celebrate" : ""
          }`}
        />
        
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            className="flex-1 px-2 py-1 border border-blue-500 rounded focus:outline-none"
            autoFocus
          />
        ) : (
          <span 
            onDoubleClick={handleDoubleClick}
            className={getTextClass()}
          >
            {todolist.text}
          </span>
        )}

      </div>
      <button
        onClick={handleDelete}
        className={`text-red-500 hover:text-red-700 transition-colors p-2 ${
          isDeleting ? "animate-shake" : ""
        }`}
      >
        <FaTrash />  
      </button>
    </div>
  );
}

export default function TodoList({ todolist, onToggle, onDelete, onUpdateText, loading }: any) {
  if (loading) {
    return <div className="text-center text-gray-500 py-8">Loading...</div>;
  }

  if (todolist.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8 bg-white rounded-lg shadow">
        You Are Free From Responsibility. Add one above!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todolist.map((todo: any) => (
        <ItemList
          key={todo.id}
          todolist={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdateText={onUpdateText}
        />
      ))}
    </div>
  );
}