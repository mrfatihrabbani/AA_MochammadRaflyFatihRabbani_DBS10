import { useState } from "react";

interface FormProps {
  onCreateTodo: (text: string) => Promise<boolean>;
}

export default function Form({ onCreateTodo }: FormProps) {
  const [newTodoList, setNewTodoList] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!newTodoList.trim()){
        return;
    }

    const success = await onCreateTodo(newTodoList);
    if (success) {
      setNewTodoList('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={newTodoList}
          onChange={(e) => setNewTodoList(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-yellow-300 text-gray-500 font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-200"
        >
          Add
        </button>
      </div>
    </form>
  );
}