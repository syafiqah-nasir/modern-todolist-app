import { CheckCircle2, Plus, Trash2, Circle, Filter, Copyright, CopyCheckIcon, CopyrightIcon } from 'lucide-react';
import React from 'react';
import TodoFilters from './TodoFilters';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAddingTodo, setFilter, markAllCompleted, clearAllComplete } from '../store/todoSlice';
import { 
  selectTodosStats, 
  selectTodos,
  selectFilter,
  selectFilteredTodos,
  selectIsAddingTodo,
  } from '../store/selectors';

function TodoApp() {
    const todos = useSelector(selectTodos);
    const filteredTodos = useSelector(selectFilteredTodos);
    const stats = useSelector(selectTodosStats);
    const filter = useSelector(selectFilter);
    const isAddingTodo = useSelector(selectIsAddingTodo);
    console.log(todos);
  //here can debug to see full state hirerchy
    // const fullState = useSelector(state => state);
    // console.log("FULL STATE:", fullState);
    const dispatch = useDispatch();

    const handleAddToDoClick = () => {
      dispatch(setIsAddingTodo(true));
      console.log('isAddingTodo: ', isAddingTodo);
    };

    const handleFilterChange = (newFilter) => {
      dispatch(setFilter(newFilter));
    };

    const handleMarkAllCompleted = () => {
      dispatch(markAllCompleted());
    }

    const handleClearAllCompleted = () => {
      dispatch(clearAllComplete());
    }

  return (
    <div className='min-h-screen bg-linear-to-br from-gray-100 via-gray-200 to-gray-300 py-8 px-4'>
      <div className='max-w-2xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-8'> 
          <h1 className='text-4xl font-bold text-gray-800 mb-2'>To-do List</h1>
            <p>Streamline your productivity, from list to done</p>
        </div>

        {/* Stats Card */}
        <div className='bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-6 border
         border-gray-300 shadow-lg'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-lg font-semibold text-gray-800'>
              Progress Overview</h2>
            <div className='text-2xl font-bold text-green-600'>
              {/* Stats Completed Logic*/}
              {stats.completionPercentage}%
            </div>
          </div>

          <div className='w-full bg-gray-300 rounded-full h-3 mb-4'>
            {/* Progressbar */}
            <div className='bg-linear-to-r from-green-500 to-green-600 h-3 rounded-full
            transition-all duration-500 ease-out'
            style={{width: `${stats.completionPercentage}%`}}></div>
          </div>

          {/* States */}
          <div className='grid grid-cols-3 gap-4 text-center'>
            <div>
              <div className='text-2xl font-bold text-gray-800'>
                {/* Stats Total Logic */}
                {stats.total}
              </div>
              <div className='text-sm text-gray-600'>Total</div>
            </div>
            <div>
              <div className='text-2xl font-bold text-gray-800'>
                {/* Stats Active Logic */}
                {stats.active}
              </div>
              <div className='text-sm text-gray-600'>Active</div>
            </div>
            <div>
              <div className='text-2xl font-bold text-gray-800'>
                {/* Stats Complete Logic */}
                {stats.completed}
              </div>
              <div className='text-sm text-gray-600'>Completed</div>
            </div>
          </div>
        </div>

        {/* Main Todo Container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-b-2xl border border-gray-300 
        shadow-lg overflow-hidden">
        {/* Action Bar */}
          <div className="p-6 border-b border-gray-300">
            <div className="flex items-center justify-between mb-4">
              <button className='flex items-center gap-3 bg-gray-800 hover:bg-gray-700
               text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium
              cursor-pointer' 
              onClick={handleAddToDoClick}>
                <Plus size={20} /> Add Todo
              </button>

              {/* Clear and Delete Buttons */}
              {/* left true return right left false return nothing */}
              {/* () => group mult jsx element into single expression */}
              {stats.total > 0 && (
                <div className="flex items-center gap-2">
                  {stats.completed > 0 && (
                    <button className="flex items-center gap-3 text-red-600 hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors duration-200 text-sm"
                    onClick={handleClearAllCompleted}>
                    <Trash2 size={16} />
                    Clear Completed
                  </button>
                  )}
                  {stats.active > 0 && (
                    <button className="flex items-center gap-3 text-green-600 hover:text-green-700 px-3 py-2 rounded-lg hover:bg-green-50 transition-colors duration-200 text-sm"
                    onClick={handleMarkAllCompleted}>
                    <CheckCircle2 size={16} />
                     Mark All Completed
                  </button>
                  )}
              </div>
              )}
            </div>
            {/* Todo Filter i will add Logics */}
            <TodoFilters 
            currentFilter={filter} 
            stats={stats} 
            onFilterChange = {handleFilterChange}
            />
          </div>
          {/* Todo Form */}
          {isAddingTodo && (
            <div className="p-6 border-b border-gray-300 bg-gray-100">
              <TodoForm placeholder= "Add Your Todo"/>
            </div>
          )}

          {/* Todo List */}
          <div className="max-h-96 overflow-y-auto">
          {filteredTodos.length === 0 ? (
            <div className="p-12 text-center">
              {todos.length === 0 ? (
                <div className="text-gray-600">
                  <Circle size={48} className="mx-auto mb-4 opacity-50"/>
                  <p className="text-lg font-medium mb-2 text-gray-800">
                    No Todos Yet
                  </p>
                  <p>Add your first todo to get started!</p>
                </div>
              ): (
                <div className="text-gray-600">
                  <Filter size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2 text-gray-800">
                      No {filter} Todos
                      <p className="text-sm">
                        {filter === "completed" && "All your todos are completed"}
                        {filter === "active" && "No completed todos yet, keep going"}
                      </p>
                  </p>
                </div>
              )}
            </div>
          ): (
            <div> 
              {filteredTodos.map((todo, index) => {
                return <TodoItem key={todo.id} todo={todo} index={index} />
              })}
            </div>
          )}
          </div>
        </div>

        {/* Footer Info */}
        <div className='flex items-center justify-center gap-1 mt-6 text-base text-black'>
          <CopyrightIcon size={16} className='mt-1'/>
          <span>syafiqahnasir</span>
        </div>
          {/* <span className='text-xs text-gray-600'> 
            {stats.total === 0 ? "Ready to be productive? " :
            stats.completionPercentage < 50 ? "You're just getting started!" :
            stats.completionPercentage < 100 ? "Halfway there!" :
            "You're amazing!"}
          </span> */}
      </div>
    </div>
  );
}
export default TodoApp;