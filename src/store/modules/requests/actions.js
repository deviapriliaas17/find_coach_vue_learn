export default{
    contactCoach(context, payLoad){
        const newRequest = {
            id:new Date().toISOString(),
            coachId:payLoad.coachId,
            userEmai:payLoad.email,
            message:payLoad.message,
        }
        context.commit('addRequest', newRequest)
    }
}