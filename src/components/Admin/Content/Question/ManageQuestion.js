import { useState, useEffect } from 'react';
import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import { FaPlus, FaMinus, FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";
import './ManageQuestion.scss';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'
import Modal from 'react-bootstrap/Modal';
import { getAllQuizzesAdmin, postCreateAnswerForQuestion, postCreateQuestionForQuiz } from '../../../../services/ApiServices';
import { toast } from 'react-toastify';

const ManageQuestion = (props) => {
    const [selectedQuiz, setSelectedQuiz] = useState({})
    const [listQuiz, setListQuiz] = useState([])
    const [previewImage, setPreviewImage] = useState('')
    const [questions, setQuestions] = useState(
        [
            {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }
        ]
    )

    const handleBtnRemoveAddQuestion = (type, id) => {
        let questionClone = _.cloneDeep(questions)
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }
            setQuestions([...questionClone, newQuestion])
        }
        if (type === 'REMOVE') {
            questionClone = questionClone.filter(item => item.id !== id)
            setQuestions(questionClone)
        }
    }
    const handleBtnRemoveAddAnswer = (type, questionId, answerId) => {
        let questionClone = _.cloneDeep(questions)
        let indexQuestion = questionClone.findIndex(item => item.id === questionId)
        if (type === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }
            questionClone[indexQuestion].answers.push(newAnswer)
            setQuestions(questionClone)
        }
        if (type === 'REMOVE') {
            questionClone[indexQuestion].answers = questionClone[indexQuestion].answers.filter(item => item.id !== answerId)
            setQuestions(questionClone)
        }
    }
    const handleOnChange = (type, questionId, value) => {
        let questionClone = _.cloneDeep(questions)
        let indexQuestion = questionClone.findIndex(item => item.id === questionId)
        if (type === 'QUESTION') {
            questionClone[indexQuestion].description = value
            setQuestions(questionClone)
        }
    }
    const handleUploadFile = (questionId, event) => {
        let questionClone = _.cloneDeep(questions)
        let indexQuestion = questionClone.findIndex(item => item.id === questionId)
        if (indexQuestion > -1 && event.target
            && event.target.files && event.target.files[0])
            questionClone[indexQuestion].imageFile = URL.createObjectURL(event.target.files[0])
        questionClone[indexQuestion].imageName = event.target.files[0].name
        setQuestions(questionClone)
    }
    const handleAnswerQuestion = (type, questionId, answerId, value) => {
        let questionClone = _.cloneDeep(questions)
        let indexQuestion = questionClone.findIndex(item => item.id === questionId)
        if (indexQuestion > -1) {
            questionClone[indexQuestion].answers =
                questionClone[indexQuestion].answers.map(answer => {
                    if (answer.id === answerId) {
                        if (type === 'CHECKBOX') {
                            answer.isCorrect = value
                        }
                        if (type === 'INPUT') {
                            answer.description = value
                        }
                    }
                    return answer
                })
            setQuestions(questionClone)
        }
    }
    const handlePreviewImage = (imageSrc) => {
        setPreviewImage(imageSrc);
    };

    const closePreview = () => {
        setPreviewImage('');
    };

    useEffect(() => {
        return () => {
            questions.forEach((question) => {
                if (question.imageFile) {
                    URL.revokeObjectURL(question.imageFile);
                }
            })
        }
    }, [questions])

    useEffect(() => {
        fetchListQuiz()
    }, [])

    const fetchListQuiz = async () => {
        const res = await getAllQuizzesAdmin()
        if (res && res.EC === 0) {
            const newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            })
            setListQuiz(newQuiz)
        }
    }

    const handleSubmitQuestion = async () => {
        if (_.isEmpty(selectedQuiz)) {
            toast.error('Pls assign a quiz!!!')
            return;
        }
        let hasError = false
        let correctAnswerCount = 0
        for (let i = 0; i < questions.length; i++) {
            const question = questions[i]
            if (!question.description.trim()) {
                toast.error(`Question ${i + 1} description is empty!`);
                hasError = true
            }
            for (let j = 0; j < question.answers.length; j++) {
                const answer = question.answers[j]
                if (!answer.description.trim()) {
                    toast.error(`Answer ${j + 1} of Question ${i + 1} is empty!`);
                    hasError = true
                }
                if (answer.isCorrect) {
                    correctAnswerCount++
                }
            }
            if (correctAnswerCount === 0) {
                toast.error(`Question ${i + 1} must have at least one correct answer!`);
                hasError = true
            }
        }
        if (hasError) {
            return
        }
        for (const question of questions) {
            const q = await postCreateQuestionForQuiz(
                +selectedQuiz.value,
                question.description,
                question.imageFile
            )
            for (const answer of question.answers) {
                await postCreateAnswerForQuestion(
                    answer.description,
                    answer.isCorrect,
                    q.DT.id
                )
            }
        }
    }

    return (
        <div className="manage-question-container">
            <div className='question-title'>
                ManageQuestion
            </div>
            <div className='add-new-question'>
                <div className='col-6 form-group'>
                    <label className='mb-2'>Select quiz</label>
                    <Select
                        menuPortalTarget={document.body}
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>
                <div className='mt-3'>
                    Add questions
                </div>
                {questions && questions.length > 0
                    && questions.map((question, index) => {
                        return (
                            <div key={question.id} className='question-main'>
                                <div className='question-content'>
                                    <div className='description'>
                                        <Form.Floating>
                                            <Form.Control
                                                type="text"
                                                placeholder="Description"
                                                value={question.description}
                                                onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)}
                                            />
                                            <label>Question {index + 1}</label>
                                        </Form.Floating>
                                    </div>
                                    <div className='group-upload'>
                                        <label
                                            htmlFor={`${question.id}`}
                                            className='label-upload'>
                                            <LuImagePlus />
                                        </label>
                                        <input
                                            id={`${question.id}`}
                                            onChange={(event) => handleUploadFile(question.id, event)}
                                            type={'file'}
                                            hidden />
                                        <span
                                            onClick={() => handlePreviewImage(question.imageFile)}
                                            className="image-preview-link"
                                        >
                                            {question.imageFile ? question.imageName : '0 file is uploaded'}</span>
                                    </div>
                                    <div className='btn-add'>
                                        <span onClick={() => handleBtnRemoveAddQuestion('ADD', question.id)}>
                                            <FaPlus className='icon-add' />
                                        </span>
                                        {questions.length > 1 &&
                                            <span onClick={() => handleBtnRemoveAddQuestion('REMOVE', question.id)}>
                                                <FaMinus className='icon-remove' />
                                            </span>
                                        }
                                    </div>
                                </div>
                                {
                                    question.answers && question.answers.length > 0
                                    && question.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className='answer-content'>
                                                <input
                                                    className='form-check-input isCorrect'
                                                    type='checkbox'
                                                    onChange={(event) => handleAnswerQuestion('CHECKBOX', question.id, answer.id, event.target.checked)}
                                                />
                                                <div className='answer-name'>
                                                    <Form.Floating>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Answer"
                                                            onChange={(event) => handleAnswerQuestion('INPUT', question.id, answer.id, event.target.value)}
                                                        />
                                                        <label>Answer {index + 1}</label>
                                                    </Form.Floating>
                                                </div>
                                                <div className='btn-group'>
                                                    <span onClick={() => handleBtnRemoveAddAnswer('ADD', question.id)}>
                                                        <FaPlusCircle className='icon-add' />
                                                    </span>
                                                    {question.answers.length > 1 &&
                                                        <span onClick={() => handleBtnRemoveAddAnswer('REMOVE', question.id, answer.id)}>
                                                            <FaMinusCircle className='icon-remove' />
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
                {questions && questions.length > 0 &&
                    <div>
                        <button
                            onClick={() => handleSubmitQuestion()}
                            className='btn btn-warning'>Save</button>
                    </div>
                }
                <Modal
                    show={!!previewImage}
                    onHide={closePreview}
                    centered
                    size='xl'
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Image Preview</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {previewImage && <img src={previewImage} alt="Preview" style={{ width: '100%' }} />}
                    </Modal.Body>
                </Modal>
            </div>
        </div >
    )
}
export default ManageQuestion;