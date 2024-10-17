import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../services/ApiServices';
import { toast } from 'react-toastify';

const ModalDeleteUser = (props) => {
    const { show, setShow, dataDelete } = props;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleBtnSubmitDeleteUser = async () => {
        let data = await deleteUser(dataDelete.id)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose()
            await props.fetchListUser()
        } else {
            toast.error(data.EM)
        }
    }
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
                className='modal-delete-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete an user</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this user <b>{dataDelete && dataDelete.email ? dataDelete.email : ""}</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleBtnSubmitDeleteUser}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;