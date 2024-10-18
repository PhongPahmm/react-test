import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaUserCircle } from "react-icons/fa6";
import _ from 'lodash';

const ModalViewUser = (props) => {
    const { show, setShow, dataView } = props;

    const handleClose = () => {
        setShow(false);
        setEmail("");
        setUsername("");
        setRole("USER");
        setImage("");
        setPreviewImage("");
    };

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (!_.isEmpty(dataView)) {
            setEmail(dataView.email);
            setUsername(dataView.username);
            setRole(dataView.role);
            if (dataView.image) {
                setPreviewImage(`data:image/png;base64, ${dataView.image}`);
            }
        }
    }, [dataView]);

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size='lg'
                backdrop='static'
                className='modal-view-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>View User Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email"
                                className="form-control"
                                value={email}
                                disabled
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input type="text"
                                className="form-control"
                                value={username}
                                disabled
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <input type="text"
                                className="form-control"
                                value={role}
                                disabled
                            />
                        </div>
                        <div className='col-md-12'>
                            <label className='form-label'>Profile Image</label>
                            <div className='img-preview'>
                                {previewImage ? <img src={previewImage} alt="User profile" /> : <span>No Image</span>}
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalViewUser;
