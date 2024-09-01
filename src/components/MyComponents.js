import React from "react";
import UserInfo from "./UserInfo";
import DisplayInfo from "./DisplayInfo";

class MyComponent extends React.Component {
    state = {
        listUsers: [
            { id: 1, name: 'PhongPahm', age: '17' },
            { id: 2, name: 'PhongPahm2', age: '22' },
            { id: 3, name: 'PhongPahm3', age: '23' }
        ]
    }
    render() {

        return (
            <div>
                <UserInfo />
                <hr></hr>
                <DisplayInfo listUsers={this.state.listUsers} />
            </div>
        );
    }
}
export default MyComponent;