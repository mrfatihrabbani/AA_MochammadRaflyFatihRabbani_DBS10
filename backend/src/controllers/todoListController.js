const todoListRepository = require('../repositories/todoListRepository');

const getAllTodoLists = async (req, res) => {
  try {
    const result = await todoListRepository.getAllTodoLists();
    res.status(200).json({ success: true, data: result.rows, count: result.rows.length });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const createTodoList = async (req, res) => {
  const { text } = req.body;
  
  if(!text) {
    return res.status(400).json({ success: false, error: 'Must require text' });
  }
  
  try {
    const result = await todoListRepository.createTodoList(text);
    res.status(201).json({ success: true, data: result.rows[0], message: 'todo has been created successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const deleteTodoListById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await todoListRepository.deleteTodoListById(id);
    
    if(result.rowCount === 0) {
      return res.status(404).json({ success: false, error: 'Error, todo not found' });
    }
    
    res.status(200).json({ success: true, message: 'todo has been deleted successfully', deletedId: id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const updateTodoListById = async (req, res) => {
  const { id } = req.params;
  const { text, done } = req.body;

  if (text === undefined && done === undefined) {
    return res.status(400).json({ success: false, error: 'Error, there is nothing to be updated' });
  }
  
  try {
    const existing = await todoListRepository.getTodoListById(id);
    
    if (existing.rowCount === 0) {
      return res.status(404).json({ success: false, error: 'Error, todo not found' });
    }

    let existText = existing.rows[0].text;
    let existDone = existing.rows[0].done;

    if (text !== undefined) {
        existText = text;
    }

    if (done !== undefined) {
        existDone = done;
    }

    const result = await todoListRepository.updateTodoListById(existText, existDone, id);
    res.status(200).json({ success: true, data: result.rows[0], message: 'todo updated successfully' });

} catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getTodoListById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await todoListRepository.getTodoListById(id);
    
    if(result.rowCount === 0) {
      return res.status(404).json({ success: false, error: 'Error, todo not found'});
    }
    
    res.status(200).json({ success: true,data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { getAllTodoLists, createTodoList, deleteTodoListById, updateTodoListById, getTodoListById };