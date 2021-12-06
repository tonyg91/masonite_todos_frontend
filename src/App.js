// Import Components 
import AllPosts from "./pages/AllPosts";
import Form from "./pages/Form";
import SinglePost from "./pages/SinglePost";

// Import Hooks from React 
import {useState, useEffect} from "react"

// Import router 6 component (Route -> Route, Switch -> Routes)
import {Route, Routes, Link, useNavigate} from "react-router-dom"
/////////////////////////
// Style Object
/////////////////////////
const h1 = {
  textAlign: "center",
  margin: "10px"
}
const button ={
  backgroundColor: "navy",
  display: "block",
  margin: "auto"
}
function App() {
  ///////////////
  // State & Other Variables
  ///////////////
  const navigate = useNavigate()
  // API URL
  const url = "https://ag-masonite-todo-backend.herokuapp.com/todos/"
  // State to hold the list of posts
  const[posts, setPosts] = useState([])

  // An empty todo for initializing the create form 
  const nullTodo = {
    subject: "",
    details: "",
  };
  // Edit State
  const [targetTodo, setTargetTodo] = useState(nullTodo);
  //////////////
  // Functions
  //////////////
   
  //function to get list of todos from API
  const getTodos = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setPosts(data)
  }

  const addTodos = async (newTodo) => {
    await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTodo)
    })
    //update the list of todos 
    getTodos()
  }

  // to select a todo to edit 
  const getTargetTodo = (todo) => {
    setTargetTodo(todo)
    navigate("/edit")
  }

  // update todo for handle submit prop 
  const updateTodo = async (todo) => {
    await fetch(url + todo.id, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todo)
    })
    //update todos
    getTodos()
  }

  // Function to edit todo on form submission
const deleteTodo = async (todo) => {
  await fetch(url + todo.id, {
    method: "delete",
  });

  // get updated list of todos
  getTodos();
  navigate("/");
};
  //////////////
  // useEffects
  //////////////

  useEffect(() => {
    getTodos()
  }, [])
  /////////////////////
  // returned JSX
  /////////////////////
  return (
    <div className="App">
      <h1 style={h1}>My To Do List</h1>
      <Link to="/new"><button style={button}>Create New Todo</button></Link>
      <Routes>
        <Route path="/" element={<AllPosts posts={posts}/>}/>
        <Route path="/post/:id" element={<SinglePost posts={posts} edit={getTargetTodo} deleteTodo={deleteTodo} />}/>
        <Route path="/new" element={<Form initialTodo={nullTodo} handleSubmit={addTodos} buttonLabel="Create Todo"/>}/>
        <Route path="/edit" element={<Form initialTodo={targetTodo} handleSubmit={updateTodo} buttonLabel="Update Todo"/>}/>
      </Routes>
    </div>
  );
}

export default App;
