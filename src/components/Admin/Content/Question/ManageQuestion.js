import { useState } from 'react';
import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import { FaPlus, FaMinus, FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";
import './ManageQuestion.scss'

const ManageQuestion = (props) => {
    const [selectedQuiz, setSelectedQuiz] = useState({})
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
                <div>
                    <div className='question-content'>
                        <div className='description'>
                            <Form.Floating>
                                <Form.Control
                                    type="text"
                                    placeholder="Description"
                                />
                                <label>Question</label>
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
                    <div className='answer-content'>
                        <input
                            className='form-check-input isCorrect'
                            type='checkbox'
                        />
                        <div className='answer-name'>
                            <Form.Floating>
                                <Form.Control
                                    type="text"
                                    placeholder="Answer"
                                />
                                <label>Answer</label>
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
                </div>
            </div>
        </div>
    )
}
export default ManageQuestion;