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
                        item.answers.isSelected = false
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

    const handlePrev = () => {
        if (currentQuestion - 1 >= 0) {
            setCurrentQuestion(currentQuestion - 1)
        }
    }
    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > currentQuestion + 1) {
            setCurrentQuestion(currentQuestion + 1)
        }
    }
    const handleCheckbox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz)
        let question = dataQuizClone.find(item => +item.questionId === +questionId)

        if (question && question.answer) {
            question.answer = question.answer.map(item => {
                if (+item.id === + answerId) {
                    item.isSelected = !item.isSelected
                }
                return item
            })
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question
            setDataQuiz(dataQuizClone)
        }
    }

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
                        handleCheckbox={handleCheckbox}
                        data={
                            dataQuiz && dataQuiz.length > 0
                                ?
                                dataQuiz[currentQuestion]
                                :
                                []
                        } />
                </div>
                <div className="quiz-btn">
                    <button
                        className="btn btn-primary"
                        onClick={() => { handlePrev() }}
                    >Prev</button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => { handleNext() }}
                    >Next</button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => { handleNext() }}
                    >Finish</button>
                </div>

            </div>
            <div className="right-container">
                right
            </div>
        </div>
    )
}
export default DetailQuiz;