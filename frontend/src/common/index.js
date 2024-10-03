const domain = `http://localhost:8080/`

const summaryAPI = {
    signup: {
        method: "POST",
        url: `${domain}api/signup`
    },
    login: {
        method: "POST",
        url: `${domain}api/login`
    },
    current_user: {
        method: "GET",
        url: `${domain}api/user-detail`
    }
}
export default summaryAPI 