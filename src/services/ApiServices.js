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

const putUpdateUser = (id, username, image, role) => {
    const form = new FormData();
    form.append('id', id);
    form.append('username', username);
    form.append('image', image);
    form.append('role', role);
    return axios.put('http://localhost:8081/api/v1/participant', form)
}
const getAllUsers = () => {
    return axios.get("http://localhost:8081/api/v1/participant/all")
}
const deleteUser = (userId) => {
    return axios.delete("http://localhost:8081/api/v1/participant", { data: { id: userId } })
}
const getUserPaginate = (page, limit) => {
    return axios.get(`http://localhost:8081/api/v1/participant?page=${page}&limit=${limit}`)
}
export { postCreateUser, getAllUsers, putUpdateUser, deleteUser, getUserPaginate }