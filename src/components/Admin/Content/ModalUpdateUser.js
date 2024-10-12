import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaFileCirclePlus } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { putUpdateUser } from '../../../services/ApiServices';
import _ from 'lodash'
const ModalUpdateUser = (props) => {
    const { show, setShow, dataUpdate } = props;

    const handleClose = () => {
        setShow(false)
        setEmail("")
        setUsername("")
        setPassword("")
        setImage("")
        setPreviewImage("")
        props.resetDataUpdate()
    };

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("")
    const [role, setRole] = useState("USER")
    const [previewImage, setPreviewImage] = useState("")

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email)
            setPassword(dataUpdate.password)
            setUsername(dataUpdate.username)
            setImage("")
            if (dataUpdate.image) {
                setPreviewImage(`data:image/png;base64, ${dataUpdate.image}`)
            }
        }
    }, [dataUpdate])

    const handleUploadImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0])
        }
    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleSubmitCreateUser = async () => {
        const isValidEmail = validateEmail(email)
        if (!isValidEmail) {
            toast.error("invalid email")
            return;
        }

        if (!username) {
            toast.error("invalid username")
            return;
        }


        let data = await putUpdateUser(dataUpdate.id, username, image, role)
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
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal
                show={show}
                onHide={handleClose}
                size='xl'
                backdrop='static'
                className='modal-add-new-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email"
                                className="form-control"
                                value={email}
                                disabled
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input type="text"
                                className="form-control"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password"
                                className="form-control"
                                value={password}
                                disabled
                                onChange={(event) => setPassword(event.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select className="form-select" onChange={(event) => setRole(event.target.value)}>
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label className='form-label label-upload' htmlFor='fileUpload'> <FaFileCirclePlus /> Upload File Image</label>
                            <input type="file"
                                hidden
                                id='fileUpload'
                                onChange={(event) => handleUploadImage(event)} />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {
                                previewImage ? <img src={previewImage}></img> : <span>Preview Image</span>
                            }

                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalUpdateUser;
