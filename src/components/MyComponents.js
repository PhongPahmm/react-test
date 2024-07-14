import React from "react";

class MyComponent extends React.Component {
    state = {
        name: 'PhongPahm',
        address: 'HaNoi',
        age: '25'
    }
    handleClick(event) {
        this.setState({
            name: 'daikphong',
            age: Math.floor((Math.random() * 100) + 1)
        }
        )
    }
    render() {
        return (
            <div>Hello my name is {this.state.name} and  I'm {this.state.age} years old
                <button onClick={(event) => this.handleClick(event)}>Click me</button>
            </div>
        );
    }
}
export default MyComponent;