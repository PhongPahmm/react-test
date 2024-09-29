import { useState } from "react";

const TableUser = (props) => {

    const [listUsers, setListusers] = useState([])
    return (
        <>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">NO</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{item.Username}</td>
                                    <td>{item.Email}</td>
                                    <td>{item.Role}</td>
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
        </>
    )
}
export default TableUser;