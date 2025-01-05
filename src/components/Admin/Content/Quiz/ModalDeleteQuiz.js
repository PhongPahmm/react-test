import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteQuiz } from '../../../../services/ApiServices';

const ModalDeleteQuiz = (props) => {
    const { show, setShow, dataDelete } = props

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleBtnSubmitDeleteQuiz = async () => {
        let data = await deleteQuiz(dataDelete.id)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            await props.fetchListQuiz()
            handleClose()
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
                className='modal-delete-quiz'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete an quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this quiz <b>{dataDelete && dataDelete.name ? dataDelete.name : ""}</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleBtnSubmitDeleteQuiz}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;