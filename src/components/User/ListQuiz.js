import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/ApiServices";
import { useNavigate } from "react-router-dom";
import './ListQuiz.scss'

const ListQuiz = (props) => {
    const [quiz, setQuiz] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getQuizData()
    }, [])

    const getQuizData = async () => {
        const res = await getQuizByUser()
        if (res && res.EC === 0) {
            setQuiz(res.DT)
        }
    }
    return (
        <div className="list-quiz-container">
            {quiz && quiz.length > 0}{
                quiz.map((quiz, index) => {
                    return (
                        <div className="card" style={{ width: "18rem" }}>
                            <img className="card-img-top" src={`data:image/jpeg;base64,${quiz.image}`} alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">Quiz {index + 1}</h5>
                                <p className="card-text">{quiz.description}</p>
                                <button className="btn btn-primary"
                                    onClick={() => navigate(`/quiz/${quiz.id}`, { state: { quizTitle: quiz.description } })}
                                >Start</button>
                            </div>
                        </div>
                    )
                })
            }
            {
                quiz.length === 0 &&
                <div>
                    You dont have any quiz now !!!
                </div>
            }
        </div >
    )
}
export default ListQuiz;