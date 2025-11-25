//basic selecttors
//found the bug filter and items return underfined 
//because of syntax 
//{ return} if u put curly barcket put return
export const selectTodos = (state) => state.todos.items;
export const selectFilter = (state) => state.todos.filter;
export const selectIsAddingTodo = (state) => state.todos.isAddingTodo;

export const selectFilteredTodos = (state) => {
    const todos = state.todos.items;     // All todos
    const filter = state.todos.filter;   // Current filter: "all", "active", or "completed"

    //filter items
    switch (filter) {
        case "active":
            return todos.filter((todo) => !todo.completed);    // Show ONLY incomplete todos
        case "completed":
            return todos.filter((todo) => todo.completed);     // Show ONLY completed todos  
        default:
            return todos;  // Show ALL todos
    };
};

//total on the status completed active and percentage
export const selectTodosStats = (state) => {
    const todos = state.todos.items;
    const total = todos.length;
    
    const completed = todos.filter((todo) => todo.completed).length;
    const active = total - completed;
    const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { todos, total, completed, active, completionPercentage };
};