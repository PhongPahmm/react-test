import './ManageQuiz.scss'
import { useState } from "react";
import ModalCreateQuiz from './ModalCreateQuiz';
import TableQuiz from './TableQuiz';
import { useEffect } from 'react';
import { getAllQuizzesAdmin } from '../../../../services/ApiServices';
import ModalUpdateQuiz from './ModalUpdateQuiz';

const ManageQuiz = (props) => {
    const [showCreateQuiz, setShowCreateQuiz] = useState(false)
    const [listQuiz, setListQuiz] = useState([])
    const [dataUpdate, setDataUpdate] = useState({})

    const [showUpdateQuiz, setShowUpdateQuiz] = useState(false)
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
            </div>
        </div>
    )
}
export default ManageQuiz;