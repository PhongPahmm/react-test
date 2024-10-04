import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss'
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/ApiServices";

const ManageUser = (props) => {
    const [showCreateUser, setShowCreateUser] = useState(false)
    const [listUsers, setListusers] = useState([])
    useEffect(() => {
        fetchListUser()
    }, [])

    const fetchListUser = async () => {
        let res = await getAllUsers()

        if (res.EC === 0) {
            setListusers(res.DT)
        }
    }
    return (
        <div className="manage-user-container">
            <div className="title">Manage User</div>
            <div className="users-content">
                <div className="btn-add-new-user">
                    <button className="btn btn-primary"
                        onClick={() => { setShowCreateUser(true) }}
                    >Add New User</button>
                </div>
                <div className="table-users-container">
                    <TableUser listUsers={listUsers} />
                </div>
                <ModalCreateUser
                    show={showCreateUser}
                    setShow={setShowCreateUser}
                    fetchListUser={fetchListUser}
                />

            </div>
        </div>
    )
}
export default ManageUser;