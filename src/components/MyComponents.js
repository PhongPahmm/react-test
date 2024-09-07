import React, { useState } from "react";
import AddUserInfo from "./AddUserInfo";
import DisplayInfo from "./DisplayInfo";

// class MyComponent extends React.Component {
//     state = {
//         listUsers: [
//             { id: 1, name: 'PhongPahm', age: '17' },
//             { id: 2, name: 'PhongPahm2', age: '22' },
//             { id: 3, name: 'PhongPahm3', age: '23' }
//         ]
//     }
//     handleAddNewUser = (newUser) => {
//         this.setState({
//             listUsers: [...this.state.listUsers, newUser]
//         })
//     }
//     handleDeleteUser = (userId) => {
//         let tempListuser = this.state.listUsers
//         tempListuser = tempListuser.filter(item => item.id !== userId)
//         this.setState({
//             listUsers: tempListuser
//         })
//     }
//     render() {
//         return (
//             <>
//                 <div className="a">
//                     <AddUserInfo
//                         handleAddNewUser={this.handleAddNewUser}
//                     />
//                     <hr></hr>
//                     <DisplayInfo
//                         listUsers={this.state.listUsers}
//                         handleDeleteUser={this.handleDeleteUser}
//                     />
//                 </div>
//                 <div className="b"></div>
//             </>
//         );
//     }
// }

const MyComponent = (props) => {

    const [listUsers, setListUsers] = useState(
        [
            { id: 1, name: 'PhongPahm', age: '17' },
            { id: 2, name: 'PhongPahm2', age: '22' },
            { id: 3, name: 'PhongPahm3', age: '23' }
        ]
    )

    const handleAddNewUser = (newUser) => {
        setListUsers([...listUsers, newUser])
    }
    const handleDeleteUser = (userId) => {
        let tempListuser = listUsers
        tempListuser = tempListuser.filter(item => item.id !== userId)
        setListUsers(tempListuser)
    }

    return (
        <>
            <div className="a">
                <AddUserInfo
                    handleAddNewUser={handleAddNewUser}
                />
                <hr></hr>
                <DisplayInfo
                    listUsers={listUsers}
                    handleDeleteUser={handleDeleteUser}
                />
            </div>
            <div className="b"></div>
        </>
    );
}

export default MyComponent;