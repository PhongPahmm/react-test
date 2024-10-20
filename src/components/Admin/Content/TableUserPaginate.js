import ReactPaginate from "react-paginate"
import { useState, useEffect } from "react";

const TableUserPaginate = (props) => {
    const { listUsers, pageCount } = props

    const handlePageClick = (event) => {
        console.log(`User requested page number ${event.selected}`);
        props.fetchListUserPaginate(parseInt(event.selected) + 1)
    };
    return (
        <>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">NO</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`table-user-${index}`}>
                                    <td>{index + 1}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => props.handleBtnViewUser(item)}
                                        >View</button>
                                        <button
                                            className="btn btn-warning mx-3"
                                            onClick={() => props.handleBtnUpdateUser(item)}
                                        >Edit</button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => props.handleBtnDeleteUser(item)}
                                        >Delete</button>
                                    </td>
                                </tr>

                            )
                        })
                    }
                    {listUsers && listUsers.length === 0 &&
                        <tr>
                            <td colSpan={"4"}>Not found data</td>
                        </tr>
                    }

                </tbody>
            </table>
            <div className="user-paginate d-flex justify-content-center">
                <ReactPaginate
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< Prev"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            </div>

        </>
    )
}
export default TableUserPaginate;