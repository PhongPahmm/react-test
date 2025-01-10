import Select from 'react-select';
import { useState, useEffect } from 'react';
import { getAllQuizzesAdmin } from '../../../../services/ApiServices';
import { getAllUsers } from '../../../../services/ApiServices';
import './AssignQuiz.scss'

const AssignQuiz = (props) => {
    const [selectedQuiz, setSelectedQuiz] = useState({})
    const [listQuiz, setListQuiz] = useState([])
    const [listUsers, setListusers] = useState([])

    useEffect(() => {
        fetchListQuiz()
        fetchListUser()
    }, [])

    const fetchListUser = async () => {
        let res = await getAllUsers()
        console.log("check res", res);

        if (res && res.EC === 0) {
            const newUsers = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username}`
                }
            })
            setListusers(newUsers)
        }
    }
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

    return (
        <div className="asign-quiz-container">
            <div className='mb-4 assign-quiz-user'>
                <label>Assign quiz: </label>
                <Select
                    menuPortalTarget={document.body}
                    styles={{
                        menuPortal: base => ({ ...base, zIndex: 9999 }),
                        control: base => ({ ...base, width: '300px' })
                    }}
                    defaultValue={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                />
                <label>For: </label>
                <Select
                    menuPortalTarget={document.body}
                    styles={{
                        menuPortal: base => ({ ...base, zIndex: 9999 }),
                        control: base => ({ ...base, width: '300px' })
                    }}
                    defaultValue={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listUsers}
                />
            </div>
        </div>
    )
}

export default AssignQuiz;