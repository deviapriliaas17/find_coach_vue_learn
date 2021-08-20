export default{
    addRequest(state, payLoad){
        state.requests.push(payLoad)
    },
    setRequests(state, payLoad){
        state.requests = payLoad
    }
}