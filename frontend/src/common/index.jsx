const domain = `http://192.168.80.246:8080/`

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
    },
    all_plan: {
        method: "GET",
        url: `${domain}public/api/plans/all`
    }
}
export default summaryAPI 
