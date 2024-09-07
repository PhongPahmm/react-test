import React, { useState } from "react";
// class AddUserInfo extends React.Component {
//     state = {
//         name: '',
//         age: ''
//     }
//     handleOnChangeName = (event) => {
//         this.setState({
//             name: event.target.value
//         }
//         )
//     }
//     handleOnChangeAge = (event) => {
//         this.setState({
//             age: event.target.value
//         }
//         )
//     }
//     handleOnSubmit = (event) => {
//         event.preventDefault()
//         this.props.handleAddNewUser({
//             id: Math.floor((Math.random() * 100) + 1) + "-random",
//             name: this.state.name,
//             age: this.state.age
//         })
//     }
//     render() {
//         return (
//             <div>Hello my name is {this.state.name} and  I'm {this.state.age} years old
//                 <form onSubmit={(event) => this.handleOnSubmit(event)}>
//                     <label>Your name: </label>
//                     <input value={this.state.name}
//                         type="text" onChange={(event) =>
//                             this.handleOnChangeName(event)}></input>

//                     <label>Your age: </label>
//                     <input value={this.state.age}
//                         type="text" onChange={(event) =>
//                             this.handleOnChangeAge(event)}></input>

//                     <button>Save</button>
//                 </form>
//             </div>
//         );
//     }
// }

const AddUserInfo = (props) => {
    const [name, setName] = useState("")
    const [age, setAge] = useState("")

    const handleOnChangeName = (event) => {
        setName(event.target.value)
    }
    const handleOnChangeAge = (event) => {
        setAge(event.target.value)
    }
    const handleOnSubmit = (event) => {
        event.preventDefault()
        props.handleAddNewUser({
            id: Math.floor((Math.random() * 100) + 1) + "-random",
            name: name,
            age: age
        })
    }
    return (
        <div>Hello my name is {name} and  I'm {age} years old
            <form onSubmit={(event) => handleOnSubmit(event)}>
                <label>Your name: </label>
                <input value={name}
                    type="text" onChange={(event) =>
                        handleOnChangeName(event)}></input>

                <label>Your age: </label>
                <input value={age}
                    type="text" onChange={(event) =>
                        handleOnChangeAge(event)}></input>

                <button>Save</button>
            </form>
        </div>
    );
}
export default AddUserInfo;