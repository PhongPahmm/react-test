import React from "react";

class DisplayInfo extends React.Component {
    render() {
        const { listUsers } = this.props
        console.log(listUsers)
        return (
            <div>
                {listUsers.map((user, index) => {
                    console.log(user)
                    return (
                        <div key={user.id}>
                            <div>My name is</div>
                        </div>
                    )
                })}
            </div>
        );
    }
}
export default DisplayInfo;