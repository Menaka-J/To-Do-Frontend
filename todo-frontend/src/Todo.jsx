import { useEffect, useState } from "react"

function Todo() {
    const [title, setTitle] = useState("");
    const [description, sestDescription] = useState("");
    const [todos, setTodos] = useState([]);
    const [error, setsError] = useState("");
    const [message, setmessage] = useState("");
    //edit
    const [editid, setEditid] = useState(-1);
    const [editTitle, setEdittitle] = useState("");
    const [editDesc, setEditdesc] = useState("");

    // const apiURL = "https://to-do-backend-37hr.onrender.com";
    const apiURL = import.meta.env.VITE_API_URL;


    //===========================================================================================
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


    //===========================================================================================
    //getting items
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

    //===========================================================================================
    //updating items
    function handleedit(item) {
        setEditid(item._id);
        setEdittitle(item.title);
        setEditdesc(item.description);
    }

    function handleupdate() {
        setsError("");
        //check inputs
        if (editTitle.trim() != "" && editDesc.trim() != "") {
            fetch(apiURL + "/todos/" + editid, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title: editTitle, description: editDesc })
            }).then((res) => {
                if (res.ok) {
                    //update item 
                    const updatedtodo = todos.map((item) =>
                        item._id === editid
                            ? { ...item, title: editTitle, description: editDesc }
                            : item
                    );

                    setTodos(updatedtodo);
                    setmessage("Item updated successfully");
                    setTimeout(() => {
                        setmessage("");
                        setTitle("");
                        sestDescription("");
                    }, 3000);

                    setEditid(-1);
                } else {
                    //show error
                    setsError("Unable to update todo item");
                }
            }).catch(() => {
                setsError("OOPS!! Unable to update todo item");
            })
        }
    }

    //===========================================================================================
    //deleting item
    function handledelete(itemid) {
        if (window.confirm("You want to delete task?")) {
            fetch(apiURL + "/todos/" + itemid, {
                method: "DELETE"
            })
                .then(() => {
                    const newtodos = todos.filter((item) => item._id !== itemid);
                    setTodos(newtodos);
                })
        }
    }

    return (
        <>

            <div className="column card p-4 shadow-sm mb-4 bg-gray m-3">
                {/* title  */}
                <div className="row bg-success text-light mb-4 rounded shadow-sm">
                    <div className="col py-3 px-4 d-flex flex-column justify-content-center">
                        <h1 className="font-weight-bold mb-1">📝 ToDo App</h1>
                        <p className="mb-0 font-italic small">Plan • Track • Complete</p>
                    </div>
                </div>

                {/* creating item  */}
                <div className="column card p-4 shadow-sm mb-4 bg-gray">
                    <h3>Add item</h3>
                    {message && <p className="text-success">{message}</p>}
                    <div className="form-group d-flex px-2">
                        <input type="text" className="form-control mr-3" placeholder="Title" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                        <input type="text" className="form-control mr-2" placeholder="Description" value={description} onChange={(e) => { sestDescription(e.target.value) }} />
                        <button className="btn btn-dark ml-2" onClick={handlesubmit}>Submit</button>
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                </div>

                {/* task list items  */}
                <div className="column mt-3">
                    <h3>Tasks</h3>

                    {/* getting items  */}
                    <ul className="list-group">
                        {todos.map((item) => (
                            <li key={item._id} className="list-group-item d-flex bg-info justify-content-between align-items-center my-2">
                                <div className="d-flex flex-column">
                                    {
                                        editid == -1 || editid !== item._id ?
                                            <>
                                                <span className="font-weight-bold">{item.title}</span>
                                                <span>{item.description}</span>
                                            </> : <>
                                                <div className="form-group d-flex px-2">
                                                    <input type="text" className="form-control mr-3" placeholder="Title" value={editTitle} onChange={(e) => { setEdittitle(e.target.value) }} />
                                                    <input type="text" className="form-control mr-2" placeholder="Description" value={editDesc} onChange={(e) => { setEditdesc(e.target.value) }} />
                                                </div>
                                            </>
                                    }

                                </div>
                                {/* button edit,update and delete,edit  */}
                                {/* updating items and deleting items  */}
                                <div className="d-flex px-2">
                                    {
                                        editid == -1 || editid !== item._id ?
                                            <>{/* edit and delete button*/}
                                                <button className=" btn btn-warning mr-2" onClick={() => handleedit(item)}>Edit</button>
                                                <button className="btn btn-danger" onClick={() => handledelete(item._id)}>Delete</button>
                                            </> :
                                            <>{/*cancel and update button  */}
                                                <button className=" btn btn-warning mr-2" onClick={() => handleupdate(item._id)}>Update</button>
                                                <button className="btn btn-danger" onClick={() => setEditid(-1)}>Cancel</button>
                                            </>
                                    }
                                </div>
                            </li>
                        ))}

                    </ul>
                </div>
            </div>

        </>
    )
}

export default Todo

// {/* title  */}
//             <div className="row bg-success text-light mb-4 rounded shadow-sm">
//                 <div className="col py-3 px-4 d-flex flex-column justify-content-center">
//                     <h1 className="font-weight-bold mb-1">📝 ToDo App</h1>
//                     <p className="mb-0 font-italic small">Plan • Track • Complete</p>
//                 </div>
//             </div>

//             {/* creating item  */}
//             <div className="column card p-4 shadow-sm mb-4 bg-gray">
//                 <h3>Add item</h3>
//                 {message && <p className="text-success">{message}</p>}
//                 <div className="form-group d-flex px-2">
//                     <input type="text" className="form-control mr-3" placeholder="Title" value={title} onChange={(e) => { setTitle(e.target.value) }} />
//                     <input type="text" className="form-control mr-2" placeholder="Description" value={description} onChange={(e) => { sestDescription(e.target.value) }} />
//                     <button className="btn btn-dark ml-2" onClick={handlesubmit}>Submit</button>
//                 </div>
//                 {error && <p className="text-danger">{error}</p>}
//             </div>

//             {/* task list items  */}
//             <div className="column mt-3">
//                 <h3>Tasks</h3>

//                 {/* getting items  */}
//                 <ul className="list-group">
//                     {todos.map((item) => (
//                         <li key={item._id} className="list-group-item d-flex bg-info justify-content-between align-items-center my-2">
//                             <div className="d-flex flex-column">
//                                 {
//                                     editid == -1 || editid !== item._id ?
//                                         <>
//                                             <span className="font-weight-bold">{item.title}</span>
//                                             <span>{item.description}</span>
//                                         </> : <>
//                                             <div className="form-group d-flex px-2">
//                                                 <input type="text" className="form-control mr-3" placeholder="Title" value={editTitle} onChange={(e) => { setEdittitle(e.target.value) }} />
//                                                 <input type="text" className="form-control mr-2" placeholder="Description" value={editDesc} onChange={(e) => { setEditdesc(e.target.value) }} />
//                                             </div>
//                                         </>
//                                 }

//                             </div>
//                             {/* button edit,update and delete,edit  */}
//                             {/* updating items and deleting items  */}
//                             <div className="d-flex px-2">
//                                 {
//                                     editid == -1 || editid !== item._id ?
//                                         <>{/* edit and delete button*/}
//                                             <button className=" btn btn-warning mr-2" onClick={() => handleedit(item)}>Edit</button>
//                                             <button className="btn btn-danger" onClick={() => handledelete(item._id)}>Delete</button>
//                                         </> :
//                                         <>{/*cancel and update button  */}
//                                             <button className=" btn btn-warning mr-2" onClick={() => handleupdate(item._id)}>Update</button>
//                                             <button className="btn btn-danger" onClick={() => setEditid(-1)}>Cancel</button>
//                                         </>
//                                 }
//                             </div>
//                         </li>
//                     ))}

//                 </ul>
//             </div>