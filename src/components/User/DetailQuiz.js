import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDetailQuiz } from "../../services/ApiServices";
import _ from 'lodash'
import './DetailQuiz.scss'
import Question from "./Question";

const DetailQuiz = (props) => {
    const [dataQuiz, setDataQuiz] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const params = useParams()
    const location = useLocation()
    const quizId = params.id

    useEffect(() => {
        getDataQuiz()
    }, [quizId])

    const getDataQuiz = async () => {
        const res = await getDetailQuiz(quizId)
        if (res && res.EC === 0) {
            let raw = res.DT
            let data = _.chain(raw)
                .groupBy('id')
                .map((val, key) => {
                    let answer = []
                    let questionDescription, image = null
                    val.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description
                            image = item.image
                        }
                        answer.push(item.answers)
                    })
                    return {
                        questionId: key, answer, questionDescription, image
                    }
                })
                .value()
            setDataQuiz(data)
        }
    }
    console.log("data quiz", dataQuiz);

    return (
        <div className="detail-quiz-container">
            <div className="left-container">
                <div className="quiz-title">
                    Quiz {quizId}: {location?.state.quizTitle}
                </div>
                <div className="quiz-img">
                    <img />
                </div>
                <div className="quiz-content">
                    <Question
                        index={currentQuestion}
                        data={
                            dataQuiz && dataQuiz.length > 0
                                ?
                                dataQuiz[currentQuestion]
                                :
                                []
                        } />
                </div>
                <div className="quiz-btn">
                    <button className="btn btn-primary">Prev</button>
                    <button className="btn btn-secondary">Next</button>
                </div>

            </div>
            <div className="right-container">
                right
            </div>
        </div>
    )
}
export default DetailQuiz;