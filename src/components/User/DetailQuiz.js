import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDetailQuiz } from "../../services/ApiServices";

const DetailQuiz = (props) => {
    const params = useParams()
    const quizId = params.id

    useEffect(() => {
        getDataQuiz()
    }, [quizId])

    const getDataQuiz = async () => {
        const res = await getDetailQuiz(quizId)
        console.log(res);
    }
    return (
        <div>
            Detail quiz
        </div>
    )
}
export default DetailQuiz;