
import './ManageQuiz.scss'
import { useState } from "react";
import ModalCreateQuiz from './ModalCreateQuiz';



const ManageQuiz = (props) => {
    const [showCreateQuiz, setShowCreateQuiz] = useState(false)

    return (
        <div className="manage-quiz-container">
            <div className="title">Manage Quiz</div>
            <div className="quiz-content">
                <div className="btn-add-new-quiz">
                    <button className="btn btn-primary"
                        onClick={() => { setShowCreateQuiz(true) }}
                    >Add New Quiz</button>
                </div>

                <ModalCreateQuiz
                    show={showCreateQuiz}
                    setShow={setShowCreateQuiz}
                />

            </div>
        </div>
    )

}
export default ManageQuiz;