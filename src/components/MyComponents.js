import React from "react";
import AddUserInfo from "./AddUserInfo";
import DisplayInfo from "./DisplayInfo";

class MyComponent extends React.Component {
    state = {
        listUsers: [
            { id: 1, name: 'PhongPahm', age: '17' },
            { id: 2, name: 'PhongPahm2', age: '22' },
            { id: 3, name: 'PhongPahm3', age: '23' }
        ]
    }
    handleAddNewUser = (newUser) => {
        this.setState({
            listUsers: [...this.state.listUsers, newUser]
        })
    }
    render() {
        return (
            <>
                <div className="a">
                    <AddUserInfo
                        handleAddNewUser={this.handleAddNewUser}
                    />
                    <hr></hr>
                    <DisplayInfo
                        listUsers={this.state.listUsers}
                    />
                </div>
                <div className="b"></div>
            </>
        );
    }
}
export default MyComponent;