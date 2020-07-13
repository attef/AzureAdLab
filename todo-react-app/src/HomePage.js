import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { authProvider } from "./authProvider";

export function AppNavBar({logout, userName}){
    return (<Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home">Todo-App</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto" />
      <Nav>
        <NavDropdown title={userName} id="basic-nav-dropdown" alignRight>
          <NavDropdown.Item onClick={logout}>Sign Out</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>)
}


function requestApi(endpoint, method, accessToken) {
    const headers = new Headers();
    headers.append("Authorization", "bearer "+ accessToken);
    return fetch(endpoint, {
        headers : headers,
        method : method
    })
    .then(function (response) {
        return response.json();
    })
}

export function TodoList() {
    const [title, setTitle] = React.useState("");
    const [todos, setTodos] = React.useState([]);

    const apiScopes = [
        "api://4dbf2a2e-197e-4e51-8cb2-2fcd27554aa3/Todo.Add",
        "api://4dbf2a2e-197e-4e51-8cb2-2fcd27554aa3/Todo.Read",
        "api://4dbf2a2e-197e-4e51-8cb2-2fcd27554aa3/Todo.ReadAll"
    ]

    React.useEffect(() => {
        authProvider.getAccessToken({
            scopes : apiScopes
        })
        .then(response => {
            requestApi("https://localhost:5001/todo/myTodos", "GET", response.accessToken)
                .then(todos => {
                    setTodos(todos);
                })
        })

    }, [])

    function addTodo(e) {
        e.preventDefault();
        authProvider.getAccessToken({
            scopes : apiScopes
        })
        .then(response => {
            requestApi("https://localhost:5001/todo/add?title="+title, "POST", response.accessToken)
                .then(todo => {
                    setTodos([...todos, todo]);
                    setTitle("");
                })
        })
    }

    return (<div className="row">
    <div className="col-md-5 offset-md-3 d-flex flex-column ">
      <p className="text-center h1 mb-3">Todo-App</p>
      <form className="form-inline justify-content-center">
        <div className="form-group mr-3">
          <input type="text" className="form-control" value={title} 
          onChange={e => setTitle(e.target.value)} placeholder="Enter todo title" />
        </div>
        <button type="submit" className="btn btn-primary" onClick={addTodo}>Add</button>
      </form>
      <p className="h4 mt-3">My todos : </p>
      <ul id="todoList">
          {todos.map((todo, index) => <li key={index}>{todo.title}</li>)}
      </ul>
    </div>
  </div>)
}
export function HomePage({logout, userName}) {
    return <React.Fragment>
        <AppNavBar logout={logout} userName={userName}/>
        <TodoList/>
    </React.Fragment>
}