import axios from "../utils/AxiosCustomize";

const postCreateUser = (email, username, password, image, role) => {
    const form = new FormData();
    form.append('email', email);
    form.append('username', username);
    form.append('password', password);
    form.append('image', image);
    form.append('role', role);
    return axios.post('http://localhost:8081/api/v1/participant', form)
}

export { postCreateUser }