function Todo() {
    return (
        <>
            <div className="row p-3 bg-success text-light mb-4">
                <h1>ToDo App</h1>
            </div>
            <div className="row">
                <h3>Add item</h3>
                <p className="text-success">Item added successfully</p>
                <div className="form-group d-flex gap-2">
                    <input type="text" className="form-control" />
                    <button className="btn btn-dark">Submit</button>
                </div>
            </div>
        </>
    )
}

export default Todo