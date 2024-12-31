import { useState } from 'react';
import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import { FaPlus, FaMinus, FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";
import './ManageQuestion.scss';
import { v4 as uuidv4 } from 'uuid';

const ManageQuestion = (props) => {
    const [selectedQuiz, setSelectedQuiz] = useState({})
    const [question, setQuestion] = useState(
        [
            {
                id: uuidv4(),
                description: 'Question 1',
                image: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: 'Answer 1',
                        isCorrect: false
                    },
                    {
                        id: uuidv4(),
                        description: 'Answer 2',
                        isCorrect: false
                    }
                ]
            },
            {
                id: uuidv4(),
                description: 'Question 2',
                image: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: 'Answer 1',
                        isCorrect: false
                    },
                    {
                        id: uuidv4(),
                        description: 'Answer 2',
                        isCorrect: false
                    }
                ]
            },
        ]
    )
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ]
    return (
        <div className="manage-question-container">
            <div className='question-title'>
                ManageQuestion
            </div>
            <div className='add-new-question'>
                <div className='col-6 form-group'>
                    <label>Select quiz</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                    />
                </div>
                <div className='mt-3'>
                    Add questions
                </div>
                {question && question.length > 0
                    && question.map((question, index) => {
                        return (
                            <div key={question.id} className='question-main'>
                                <div className='question-content'>
                                    <div className='description'>
                                        <Form.Floating>
                                            <Form.Control
                                                type="text"
                                                placeholder="Description"
                                                value={question.description}
                                            />
                                            <label>Question {index + 1}</label>
                                        </Form.Floating>
                                    </div>
                                    <div className='group-upload'>
                                        <label className='label-upload'>
                                            <LuImagePlus />
                                        </label>
                                        <input type='file' hidden />
                                        <span>0 file is uploaded</span>
                                    </div>
                                    <div className='btn-add'>
                                        <span>
                                            <FaPlus className='icon-add' />
                                        </span>
                                        <span>
                                            <FaMinus className='icon-remove' />
                                        </span>
                                    </div>
                                </div>
                                {question.answers && question.answers.length > 0
                                    && question.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className='answer-content'>
                                                <input
                                                    className='form-check-input isCorrect'
                                                    type='checkbox'
                                                />
                                                <div className='answer-name'>
                                                    <Form.Floating>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Answer"
                                                            value={answer.description}
                                                        />
                                                        <label>Answer {index + 1}</label>
                                                    </Form.Floating>
                                                </div>
                                                <div className='btn-group'>
                                                    <span>
                                                        <FaPlusCircle className='icon-add' />
                                                    </span>
                                                    <span>
                                                        <FaMinusCircle className='icon-remove' />
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    })}

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default ManageQuestion;