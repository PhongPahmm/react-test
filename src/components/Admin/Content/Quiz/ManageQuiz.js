import './ManageQuiz.scss'
import { useState } from "react";
import ModalCreateQuiz from './ModalCreateQuiz';
import TableQuiz from './TableQuiz';
import { useEffect } from 'react';
import { getAllQuizzesAdmin } from '../../../../services/ApiServices';
import ModalUpdateQuiz from './ModalUpdateQuiz';
import ModalDeleteQuiz from './ModalDeleteQuiz';

const ManageQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([])
    const [dataUpdate, setDataUpdate] = useState({})
    const [dataDelete, setDataDelete] = useState({})
    const [showCreateQuiz, setShowCreateQuiz] = useState(false)
    const [showUpdateQuiz, setShowUpdateQuiz] = useState(false)
    const [showDeleteQuiz, setShowDeleteQuiz] = useState(false)
    useEffect(() => {
        fetchListQuiz()
    }, [])

    const fetchListQuiz = async () => {
        const res = await getAllQuizzesAdmin()
        if (res && res.EC === 0) {
            setListQuiz(res.DT)
        }
    }
    const handleBtnUpdateQuiz = (quiz) => {
        setShowUpdateQuiz(true)
        setDataUpdate(quiz)
    }
    const handleBtnDeleteQuiz = (quiz) => {
        setShowDeleteQuiz(true)
        setDataDelete(quiz)
    }
    return (
        <div className="manage-quiz-container">
            <div className="title">Manage Quiz</div>
            <div className="quiz-content">
                <div className="btn-add-new-quiz">
                    <button className="btn btn-primary"
                        onClick={() => { setShowCreateQuiz(true) }}
                    >Add New Quiz</button>
                </div>
                <div className='list-quiz'>
                    <TableQuiz
                        listQuiz={listQuiz}
                        handleBtnUpdateQuiz={handleBtnUpdateQuiz}
                        handleBtnDeleteQuiz={handleBtnDeleteQuiz}
                    />
                </div>
                <ModalCreateQuiz
                    show={showCreateQuiz}
                    setShow={setShowCreateQuiz}
                    fetchListQuiz={fetchListQuiz}
                />
                <ModalUpdateQuiz
                    show={showUpdateQuiz}
                    setShow={setShowUpdateQuiz}
                    dataUpdate={dataUpdate}
                    fetchListQuiz={fetchListQuiz}
                />
                <ModalDeleteQuiz
                    show={showDeleteQuiz}
                    setShow={setShowDeleteQuiz}
                    dataDelete={dataDelete}
                    fetchListQuiz={fetchListQuiz}
                />
            </div>
        </div>
    )
}
export default ManageQuiz;