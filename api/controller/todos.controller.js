const Todo = require('../models/todos.model');

const addTodo = async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const savedTodo = await todo.save();
        res.status(200).json({message: 'Todo added', success: true});                                            
    } catch (error) {
        res.status(400).json({message: "something went wrong", success: false});
    }
}

const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;

        const updatedTodo = await Todo.findById(id);

        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found', success: false });
        }

        updatedTodo.title = title;
        updatedTodo.description = description;
        updatedTodo.completed = completed;

        await updatedTodo.save();

        res.status(200).json({ message: 'Todo updated', success: true, todo: updatedTodo });
    } catch (error) {
        res.status(400).json({ message: "Something went wrong", success: false });
    }
};


const deleteTodo = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedTodo = await Todo.findByIdAndDelete(id);
        res.status(200).json({message: 'Todo deleted', success: true});
    } catch (error) {
        res.status(400).json({message: "something went wrong", success: false});
    }
}

const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.status(200).json({todos, success: true});
    } catch (error) {
        res.status(400).json({message: "something went wrong", success: false});
    }
}

module.exports = {
    addTodo,
    updateTodo,
    deleteTodo,
    getAllTodos
}