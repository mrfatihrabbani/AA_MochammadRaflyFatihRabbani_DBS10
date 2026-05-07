import { useState, useEffect } from "react";
import { todolistApi } from "@/config/api";

export const todolistHooks = () => {
  const [todolist, setTodoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTodoList = async () => {
    try {
      setLoading(true);
      const response = await todolistApi.getAll();
      if (response.data.success) {
        setTodoList(response.data.data);
      }
    } catch (err) {
      setError("Error, failed to load todo list");
    } finally {
      setLoading(false);
    }
  };

  const createTodoList = async (text) => {
    try {
      const response = await todolistApi.create(text);
      if (response.data.success) {
        await fetchTodoList();
        return true;
      }
      return false;
    } catch (err) {
      setError("Error, failed to create todo list");
      return false;
    }
  };

  const toggleTodoList = async (id, currentDone, currentText) => {
    try {
      const response = await todolistApi.update(id, currentText, !currentDone);
      if (response.data.success) {
        await fetchTodoList();
      }
    } catch (err) {
      setError("Error, failed to update todo list");
    }
  };

  const deleteTodoList = async (id) => {
    try {
      const response = await todolistApi.delete(id);
      if (response.data.success) {
        await fetchTodoList();
      }
    } catch (err) {
      setError("Error, failed to delete todo list");
    }
  };

  const updateTodoListText = async (id, text, done) => {
    try {
      const response = await todolistApi.update(id, text, done);
      if (response.data.success) {
        await fetchTodoList();
      }
    } catch (err) {
      setError("Error, failed to update todo text");
    }
  };

  useEffect(() => {
    fetchTodoList();
  }, []);

  return {todolist, loading, error, setError, createTodoList, toggleTodoList, deleteTodoList, updateTodoListText};
};