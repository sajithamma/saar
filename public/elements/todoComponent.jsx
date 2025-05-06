import { useState } from 'react';

// Sample initial data structure
const initialTodoGroups = [
    {
        id: 1,
        title: 'Help Page Fixes',
        completed: '1/4 completed',
        todos: [
            { id: 1, text: 'Update video to show new background', completed: false, assignee: 'Ali J.', dueDate: 'Oct 8' },
            { id: 2, text: 'Update Help Page videos', completed: false, assignee: 'Melissa V.' },
            { id: 3, text: 'Update Help Page copy', completed: false, assignee: 'Lisa K.' },
            { id: 4, text: 'Broken link', completed: true, assignee: 'Liam B.' }
        ]
    },
    {
        id: 2,
        title: 'Support Team Improvement Requests',
        completed: '1/3 completed',
        todos: [
            { id: 5, text: 'Offer support via chat', completed: false },
            { id: 6, text: 'Better internal billing tools', completed: false },
            { id: 7, text: 'Calendar for phone calls?', completed: false, assignee: 'Melissa K.' }
        ]
    },
    {
        id: 3,
        title: 'Crisis Drills w/ Ops',
        completed: '0/1 completed',
        todos: [
            { id: 8, text: 'Crisis Drill w/ Ops', completed: false, assignee: 'Mitch, Oni, Chris S.', dueDate: 'April 14' }
        ]
    }
];

export default function TodoComponent() {
    const [todoGroups, setTodoGroups] = useState(initialTodoGroups);
    const [newTodoTexts, setNewTodoTexts] = useState({});

    const handleToggleTodo = (groupId, todoId) => {
        setTodoGroups(groups => {
            const newGroups = [...groups];
            const groupIndex = newGroups.findIndex(g => g.id === groupId);

            if (groupIndex !== -1) {
                const todoIndex = newGroups[groupIndex].todos.findIndex(t => t.id === todoId);

                if (todoIndex !== -1) {
                    // Create a new todo with toggled completed status
                    const updatedTodo = {
                        ...newGroups[groupIndex].todos[todoIndex],
                        completed: !newGroups[groupIndex].todos[todoIndex].completed
                    };

                    // Replace the old todo with the updated one
                    const newTodos = [...newGroups[groupIndex].todos];
                    newTodos[todoIndex] = updatedTodo;

                    // Update the group with new todos
                    newGroups[groupIndex] = {
                        ...newGroups[groupIndex],
                        todos: newTodos
                    };

                    // Calculate new completed count
                    const completedCount = newTodos.filter(t => t.completed).length;
                    newGroups[groupIndex].completed = `${completedCount}/${newTodos.length} completed`;

                    // Call action to update backend
                    callAction({
                        name: "toggle_todo",
                        payload: {
                            groupId,
                            todoId,
                            completed: updatedTodo.completed
                        }
                    });
                }
            }

            return newGroups;
        });
    };

    const handleAddTodo = (groupId) => {
        if (!newTodoTexts[groupId] || newTodoTexts[groupId].trim() === '') return;

        setTodoGroups(groups => {
            const newGroups = [...groups];
            const groupIndex = newGroups.findIndex(g => g.id === groupId);

            if (groupIndex !== -1) {
                // Create a new todo
                const newTodo = {
                    id: Date.now(), // Simple unique ID
                    text: newTodoTexts[groupId],
                    completed: false
                };

                // Add the new todo to the group
                const newTodos = [...newGroups[groupIndex].todos, newTodo];

                // Update the group with new todos
                newGroups[groupIndex] = {
                    ...newGroups[groupIndex],
                    todos: newTodos
                };

                // Update completed count
                const completedCount = newTodos.filter(t => t.completed).length;
                newGroups[groupIndex].completed = `${completedCount}/${newTodos.length} completed`;

                // Call action to update backend
                callAction({
                    name: "add_todo",
                    payload: {
                        groupId,
                        todo: newTodo
                    }
                });
            }

            return newGroups;
        });

        // Clear the input field
        setNewTodoTexts({
            ...newTodoTexts,
            [groupId]: ''
        });
    };

    const handleNewTodoChange = (groupId, value) => {
        setNewTodoTexts({
            ...newTodoTexts,
            [groupId]: value
        });
    };

    const handleAddList = () => {
        const newGroupId = Date.now();
        const newGroup = {
            id: newGroupId,
            title: 'New List',
            completed: '0/0 completed',
            todos: []
        };

        setTodoGroups([...todoGroups, newGroup]);

        callAction({
            name: "add_list",
            payload: {
                group: newGroup
            }
        });
    };

    return (
        <div className="todo-container">
            <div className="todo-header">
                <h1>To-dos <span className="todo-count">{todoGroups.length} lists</span></h1>
                <button className="add-list-btn" onClick={handleAddList}>
                    <span className="add-icon">+</span> New list
                </button>
            </div>

            <div className="todo-groups">
                {todoGroups.map(group => (
                    <div key={group.id} className="todo-group">
                        <div className="group-header">
                            <span className="completed-count">{group.completed}</span>
                            <h2 className="group-title">{group.title}</h2>
                        </div>

                        <ul className="todo-list">
                            {group.todos.map(todo => (
                                <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                                    <label className="checkbox-container">
                                        <input
                                            type="checkbox"
                                            checked={todo.completed}
                                            onChange={() => handleToggleTodo(group.id, todo.id)}
                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                    <span className="todo-text">{todo.text}</span>
                                    {todo.assignee && <span className="todo-assignee">{todo.assignee}</span>}
                                    {todo.dueDate && <span className="todo-due-date">{todo.dueDate}</span>}
                                </li>
                            ))}
                        </ul>

                        <div className="add-todo">
                            <input
                                type="text"
                                placeholder="Add a to-do"
                                value={newTodoTexts[group.id] || ''}
                                onChange={(e) => handleNewTodoChange(group.id, e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddTodo(group.id)}
                            />
                            <button onClick={() => handleAddTodo(group.id)}>Add</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
