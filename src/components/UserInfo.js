import React from "react";
class UserInfo extends React.Component {
    state = {
        name: 'PhongPahm',
        address: 'HaNoi',
        age: '25'
    }
    handleOnChangeName = (event) => {
        this.setState({
            name: event.target.value
        }
        )
    }
    handleOnChangeAge = (event) => {
        this.setState({
            age: event.target.value
        }
        )
    }
    handleOnSubmit = (event) => {
        event.preventDefault()
        console.log(this.state)

    }
    render() {
        return (
            <div>Hello my name is {this.state.name} and  I'm {this.state.age} years old
                <form onSubmit={(event) => this.handleOnSubmit(event)}>
                    <label>Your name: </label>
                    <input value={this.state.name}
                        type="text" onChange={(event) =>
                            this.handleOnChangeName(event)}></input>

                    <label>Your age: </label>
                    <input value={this.state.age}
                        type="text" onChange={(event) =>
                            this.handleOnChangeAge(event)}></input>

                    <button>Save</button>
                </form>
            </div>
        );
    }
}
export default UserInfo;