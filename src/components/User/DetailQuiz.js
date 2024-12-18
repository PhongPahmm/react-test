import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDetailQuiz } from "../../services/ApiServices";
import _ from 'lodash'

const DetailQuiz = (props) => {
    const params = useParams()
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
                        answer.push(item.answer)
                    })
                    return {
                        questionId: key, answer, questionDescription, image
                    }
                })
                .value()
        }
    }
    return (
        <div>
            Detail quiz
        </div>
    )
}
export default DetailQuiz;