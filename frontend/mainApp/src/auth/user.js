export const getUserToken = () => {
    const token = sessionStorage.getItem('token');
    return token
}
