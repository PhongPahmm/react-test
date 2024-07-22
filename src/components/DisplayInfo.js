import React from "react";

class DisplayInfo extends React.Component {
    render() {
        const { listUsers } = this.props
        console.log(listUsers)
        return (
            <div>
                {listUsers.map((user) => {
                    console.log(user)
                    return (
                        <div>My name is</div>
                    )
                })}
            </div>
        );
    }
}
export default DisplayInfo;