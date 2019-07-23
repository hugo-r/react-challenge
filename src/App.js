import React from 'react';

import './App.css';
import TodosSorting from './components/TodosSorting';
import CreateTodo from './components/CreateTodo';
import TodosList from './containers/TodosList';
import TodosFiltering from './components/TodosFiltering';

function App() {
    return (
        <div id="App">
            <CreateTodo />
            <TodosSorting />           
            <TodosList id="TodosList" />
            <TodosFiltering id="TodosFiltering" />
        </div>
    );
}

export default App;