import Select from 'react-select';
import { useState, useEffect } from 'react';
import { getAllQuizzesAdmin, postAssignQuiz } from '../../../../services/ApiServices';
import { getAllUsers } from '../../../../services/ApiServices';
import { toast } from 'react-toastify';
import './AssignQuiz.scss'

const AssignQuiz = (props) => {
    const [selectedQuiz, setSelectedQuiz] = useState({})
    const [selectedUser, setSelectedUser] = useState({})
    const [listQuiz, setListQuiz] = useState([])
    const [listUsers, setListusers] = useState([])

    useEffect(() => {
        fetchListQuiz()
        fetchListUser()
    }, [])

    const fetchListUser = async () => {
        let res = await getAllUsers()
        if (res && res.EC === 0) {
            const users = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} -${item.email}`
                }
            })
            setListusers(users)
        }
    }
    const fetchListQuiz = async () => {
        const res = await getAllQuizzesAdmin()
        if (res && res.EC === 0) {
            const newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`
                }
            })
            setListQuiz(newQuiz)
        }
    }

    const handleAssign = async () => {
        const res = await postAssignQuiz(selectedQuiz.value, selectedUser.value)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setSelectedQuiz({})
            setSelectedUser({})
        } else {
            toast.error(res.EM)
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
                    defaultValue={selectedUser}
                    onChange={setSelectedUser}
                    options={listUsers}
                />
                <div>
                    <button
                        onClick={() => handleAssign()}
                        className='btn btn-warning'>Assign</button>
                </div>
            </div>
        </div>
    )
}

export default AssignQuiz;