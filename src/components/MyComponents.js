import React from "react";

class MyComponent extends React.Component {
    state = {
        name: 'PhongPahm',
        address: 'HaNoi',
        age: '25'
    }
    render() {
        return (
            <div>Hello my name is {this.state.name} and  I'm from {this.state.address} and I'm {this.state.age} years old</div>
        );
    }
}
export default MyComponent;