import React, { useState } from "react";
import './DisplayInfo.scss'
import logo from './../logo.svg'

// class DisplayInfo extends React.Component {



//     render() {
//         const { listUsers } = this.props
//         console.log(listUsers)
//         return (
//             <div className="display-infor-container">

//                 {true &&
//                     <>
//                         {listUsers.map((user, index) => {
//                             return (
//                                 <div key={index} className={+user.age > 18 ? "red" : "green"}>
//                                     <div>My name is {user.name}</div>
//                                     <div>My age is {user.age}</div>
//                                     <div>
//                                         <button onClick={() => { this.props.handleDeleteUser(user.id) }}>Delete</button>
//                                     </div>
//                                     <hr></hr>
//                                 </div>
//                             )
//                         })}
//                     </>}
//             </div>
//         );
//     }
// }

const DisplayInfo = (props) => {
    const { listUsers } = props
    const [isShowHideListUser, setShowHideListUser] = useState(true)

    const handleShowHideListUser = () => {
        setShowHideListUser(!isShowHideListUser)
    }
    return (
        <div className="display-infor-container">
            <div>
                <button onClick={() => handleShowHideListUser()}>
                    {isShowHideListUser === true ? "Hide List User" : "Show List User"}
                </button>
            </div>
            {isShowHideListUser &&
                <>
                    {listUsers.map((user, index) => {
                        return (
                            <div key={index} className={+user.age > 18 ? "red" : "green"}>
                                <div>My name is {user.name}</div>
                                <div>My age is {user.age}</div>
                                <div>
                                    <button onClick={() => { props.handleDeleteUser(user.id) }}>Delete</button>
                                </div>
                                <hr></hr>
                            </div>
                        )
                    })}
                </>}
        </div>
    );
}

export default DisplayInfo;