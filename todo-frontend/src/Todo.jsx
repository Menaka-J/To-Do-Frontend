import { useState } from "react"

function Todo() {
    const [title, setTitle] = useState("");
    const [description, sestDescription] = useState("");

    function handlesubmit() {

    }
    return (
        <>
            <div className="row p-3 bg-success text-light mb-4">
                <h1>ToDo App</h1>
            </div>
            <div className="column">
                <h3>Add item</h3>
                <p className="text-success">Item added successfully</p>
                <div className="form-group d-flex gap-2">
                    <input type="text" className="form-control" placeholder="Title" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                    <input type="text" className="form-control" placeholder="Description" value={description} onChange={(e) => { sestDescription(e.target.value) }} />
                    <button className="btn btn-dark" onClick={handlesubmit}>Submit</button>
                </div>
            </div>
        </>
    )
}

export default Todo