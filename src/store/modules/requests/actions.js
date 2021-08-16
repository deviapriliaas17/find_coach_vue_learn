export default{
    async contactCoach(context, payLoad){
        const newRequest = {
            id:new Date().toISOString(),
            coachId:payLoad.coachId,
            userEmail:payLoad.email,
            message:payLoad.message,
        }
        const response = await fetch(
            `https://coaches-a06e4-default-rtdb.firebaseio.com/requests/${payLoad.coachId}.json`,{
                method:'PUT',
                body: JSON.stringify(newRequest)
            }
        )

        if(!response.ok){
            // error
        }
        
        context.commit('addRequest', newRequest)
    }
}