import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaFileCirclePlus } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { postCreateQuiz } from '../../../../services/ApiServices';


const ModalCreateQuiz = (props) => {
    const { show, setShow } = props;

    const handleClose = () => {
        setShow(false)
        setName("")
        setDescription("")
        setType("")
        setImage("")
        setPreviewImage("")
    };

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState("EASY")
    const [image, setImage] = useState("")
    const [previewImage, setPreviewImage] = useState("")

    const handleUploadImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0])
        }
    }

    const handleSubmitCreateQuiz = async () => {
        let data = await postCreateQuiz(description, name, type, image)
        console.log('quiz', data);

        if (data && data.EC === 0) {
            toast.success(data.EM)
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
                size='xl'
                backdrop='static'
                className='modal-add-new-quiz'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input type="text"
                                className="form-control"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Type</label>
                            <select className="form-select" onChange={(event) => setType(event.target.value)}>
                                <option value="EASY">EASY</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HARD">HARD</option>
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
                    <Button variant="primary" onClick={() => handleSubmitCreateQuiz()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalCreateQuiz;
