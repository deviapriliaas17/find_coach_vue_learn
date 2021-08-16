export default {
    registerCoach(state, payLoad){
        state.coaches.push(payLoad);
    },
    setCoaches(state, payLoad){
        state.coaches = payLoad
    }
}