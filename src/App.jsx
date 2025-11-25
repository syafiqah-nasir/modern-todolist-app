import React from 'react'
import TodoApp from "./components/TodoApp";
import { Provider} from "react-redux";
import { store } from "./store/store";

function App() {
  return(
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
}

export default App;