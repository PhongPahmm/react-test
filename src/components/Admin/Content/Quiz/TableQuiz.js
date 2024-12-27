const TableQuiz = (props) => {
    const { listQuiz } = props

    return (
        <>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">NO</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.length > 0 &&
                        listQuiz.map((item, index) => {
                            return (
                                <tr key={`table-quiz-${index}`}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.difficulty}</td>
                                    <td>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => props.handleBtnViewQuiz(item)}
                                        >View</button>
                                        <button
                                            className="btn btn-warning mx-3"
                                            onClick={() => props.handleBtnUpdateQuiz(item)}
                                        >Edit</button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => props.handleBtnDeleteQuiz(item)}
                                        >Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listQuiz && listQuiz.length === 0 &&
                        <tr>
                            <td colSpan={"5"}>Not found data</td>
                        </tr>
                    }
                </tbody>
            </table>
        </>
    )
}
export default TableQuiz;