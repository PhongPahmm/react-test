import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/ApiServices";
import './ListQuiz.scss'

const ListQuiz = (props) => {
    const [quiz, setQuiz] = useState([])
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
                                <button className="btn btn-primary">Start</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default ListQuiz;