import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss'
import { useState } from "react";
const ManageUser = (props) => {
    const [showCreateUser, setShowCreateUser] = useState(false)
    return (
        <div className="manage-user-container">
            <div className="title">Manage User</div>
            <div className="users-content">
                <div className="btn-add-new-user">
                    <button className="btn btn-primary"
                        onClick={() => { setShowCreateUser(true) }}
                    >Add New User</button>
                </div>
                <div className="table-users-container">Table User
                    <ModalCreateUser
                        show={showCreateUser}
                        setShow={setShowCreateUser}
                    />
                </div>
            </div>
        </div>
    )
}
export default ManageUser;