import './App.css';
import 'antd/dist/antd.css';
import AddToDo from './components/add-to-do.component';

function App() {
  return (
    <div className="container">
      <h1 className="text-center m-5 h1">My Todo List</h1>
      <AddToDo/>
    </div>
  );
}

export default App;
