const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let todos = [
    {id: 1, task: 'Learn Node.js'},
]

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const {task} = req.body;
    const newTodo = {id: todos.length + 1, task: task};

    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
    const {id} = req.params;
    const {task} = req.body;
    const updatedTodo = {id, task};
    
    todos = todos.map(todo => (todo.id === parseInt(id)) ? updatedTodo : todo);
    res.json(todos.find(todo => todo.id === parseInt(id)));
});

app.delete('/todos/:id', (req, res) => {
    const {id} = req.params;

    todos = todos.filter(todo => todo.id !== parseInt(id));
    res.status(204).send();
});

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.use((req, res, next) => {
    console.log(`Request Type: ${req.method}`);
    console.log(`Request URL: ${req.url}`);
    next();
});

app.use('/static', express.static('public'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
