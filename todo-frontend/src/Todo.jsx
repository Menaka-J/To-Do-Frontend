import { useEffect, useState } from "react"

function Todo() {
    const [title, setTitle] = useState("");
    const [description, sestDescription] = useState("");
    const [todos, setTodos] = useState([]);
    const [error, setsError] = useState("");
    const [message, setmessage] = useState("");
    const apiURL = "http://localhost:8000";

    //function for adding item
    function handlesubmit() {

        setsError("");
        //check inputs
        if (title.trim() != "" && description.trim() != "") {
            fetch(apiURL + "/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, description })
            }).then((res) => {
                if (res.ok) {
                    //add item 
                    setTodos(todo => [...todo, { title, description }]);
                    setmessage("Item added successfully");
                    setTimeout(() => {
                        setmessage("");
                        setTitle("");
                        sestDescription("");
                    }, 3000);
                } else {
                    //show error
                    setsError("Unable to create todo item");
                }
            }).catch(() => {
                setsError("Unable to create todo item");
            })
        }
    }

    useEffect(() => {
        getitems();
    }, [])

    function getitems() {
        fetch(apiURL + "/todos")
            .then((res) => res.json())
            .then((res) => {
                setTodos(res)
            })
    }

    return (
        <>
            <div className="row p-3 bg-success text-light mb-4">
                <h1>ToDo App</h1>
            </div>

            {/* creating item  */}
            <div className="column">
                <h3>Add item</h3>
                {message && <p className="text-success">{message}</p>}
                <div className="form-group d-flex gap-2">
                    <input type="text" className="form-control" placeholder="Title" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                    <input type="text" className="form-control" placeholder="Description" value={description} onChange={(e) => { sestDescription(e.target.value) }} />
                    <button className="btn btn-dark" onClick={handlesubmit}>Submit</button>
                </div>
                {error && <p className="text-danger">{error}</p>}
            </div>

            {/* getting items  */}
            <div className="column mt-3">
                <h3>Tasks</h3>
                <ul className="list-group">
                    <li className="list-group-item d-flex bg-info justify-content-between align-items-center my-2">
                        <div className="d-flex flex-column">
                            <span className="font-weight-bold">Item Text</span>
                            <span>Descripyion</span>
                        </div>
                        <div className="d-flex px-2">
                            <button className=" btn btn-warning mr-2">Edit</button>
                            <button className="btn btn-danger">Delete</button>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Todo