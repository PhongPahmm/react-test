import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss'
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/ApiServices";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import ModalViewUser from "./ModalViewUser";

const ManageUser = (props) => {
    const [showUser, setShowUser] = useState(false)
    const [showCreateUser, setShowCreateUser] = useState(false)
    const [showUpdateUser, setShowUpdateUser] = useState(false)
    const [showDeleteUser, setShowDeleteUser] = useState(false)
    const [dataView, setDataViewUser] = useState({})
    const [dataUpdate, setDataUpdate] = useState({})
    const [dataDelete, setDataDelete] = useState({})
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

    const handleBtnViewUser = (user) => {
        setShowUser(true)
        setDataViewUser(user)
    }
    const handleBtnUpdateUser = (user) => {
        setShowUpdateUser(true)
        setDataUpdate(user)
    }
    const handleBtnDeleteUser = (user) => {
        setShowDeleteUser(true)
        setDataDelete(user)
    }

    const resetDataUpdate = (user) => {
        setDataUpdate({})
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
                    <TableUser
                        listUsers={listUsers}
                        handleBtnViewUser={handleBtnViewUser}
                        handleBtnUpdateUser={handleBtnUpdateUser}
                        handleBtnDeleteUser={handleBtnDeleteUser}
                    />
                </div>
                <ModalViewUser
                    show={showUser}
                    setShow={setShowUser}
                    dataView={dataView}
                />
                <ModalCreateUser
                    show={showCreateUser}
                    setShow={setShowCreateUser}
                    fetchListUser={fetchListUser}
                />
                <ModalUpdateUser
                    show={showUpdateUser}
                    setShow={setShowUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUser={fetchListUser}
                    resetDataUpdate={resetDataUpdate}
                />
                <ModalDeleteUser
                    show={showDeleteUser}
                    setShow={setShowDeleteUser}
                    dataDelete={dataDelete}
                    fetchListUser={fetchListUser}
                />
            </div>
        </div>
    )

}
export default ManageUser;