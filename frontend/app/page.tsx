"use client";

import { todolistHooks } from "@/hooks/todolistHooks";
import Header from "@/components/Header";
import Form from "@/components/Form";
import TodoList from "@/components/ItemList";

export default function Home() {
  const {
    todolist,
    loading,
    error,
    setError,
    createTodoList,
    toggleTodoList,
    deleteTodoList,
    updateTodoListText,
  } = todolistHooks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-orange-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Header />

        <div className="mt-6 mb-4 text-center text-white text-lg font-bold tracking-wide">
          {todolist.length} {todolist.length === 1 ? "item" : "items"} total
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
            <button className="float-right font-bold" onClick={() => setError('')}>
              ×
            </button>
          </div>
        )}
        
        <Form onCreateTodo={createTodoList} />
        
        <TodoList
          todolist={todolist}
          onToggle={toggleTodoList}
          onDelete={deleteTodoList}
          onUpdateText={updateTodoListText}
          loading={loading}
        />

      </div>
    </div>
  );
}