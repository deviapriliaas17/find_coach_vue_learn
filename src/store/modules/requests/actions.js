export default{
    contactCoach(context, payLoad){
        const newRequest = {
            id:new Date().toISOString(),
            coachId:payLoad.coachId,
            userEmail:payLoad.email,
            message:payLoad.message,
        }
        context.commit('addRequest', newRequest)
    }
}