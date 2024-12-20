import _ from 'lodash'

const Question = (props) => {
    const { data, index } = props

    if (_.isEmpty(data)) {
        return (<></>)
    }

    return (
        <>
            <div className='question-img'>
                <img src={`data:image/jpeg;base64,${data.image}`} />
            </div>
            <div className="questions">
                Question {index + 1}: {data.questionDescription}
            </div>
            <div className="answers">
                {data.answer && data.answer.length > 0 &&
                    data.answer.map((val, index) => {
                        return (
                            <div className="a-child">
                                <div className="form-check">
                                    <input class="form-check-input" type="checkbox" value="" />
                                    <label class="form-check-label">
                                        {val.description}
                                    </label>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default Question;