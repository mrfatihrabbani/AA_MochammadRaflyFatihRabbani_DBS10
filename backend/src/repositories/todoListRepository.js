const pool = require('../database/database');

const getAllTodoLists = async () => {
  const selectQ = 'SELECT * FROM todolist ORDER BY created_at DESC';
  return pool.query(selectQ);
};

const createTodoList = async (text) => {
  const insertQ = 'INSERT INTO todolist (text) VALUES ($1) RETURNING *';
  return pool.query(insertQ, [text]);
};

const deleteTodoListById = async (id) => {
  const deleteQ = 'DELETE FROM todolist WHERE id = $1 RETURNING *';
  return pool.query(deleteQ, [id]);
};

const updateTodoListById = async (text, done, id) => {
  const updateQ = 'UPDATE todolist SET text = $1, done = $2 WHERE id = $3 RETURNING *';
  return pool.query(updateQ, [text, done, id]);
};

const getTodoListById = async (id) => {
  const selectQ = 'SELECT * FROM todolist WHERE id = $1';
  return pool.query(selectQ, [id]);
};

module.exports = { getAllTodoLists, createTodoList, deleteTodoListById, updateTodoListById, getTodoListById };