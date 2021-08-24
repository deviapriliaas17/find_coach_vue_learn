export default{
    async contactCoach(context, payLoad){
        const newRequest = {
            // coachId:payLoad.coachId,
            userEmail:payLoad.email,
            message:payLoad.message,
        }
        const uniqueId = (Math.random() + 1).toString(36).substring(7);
        const response = await fetch(
          `https://coaches-a06e4-default-rtdb.firebaseio.com/requests/${payLoad.coachId}/${uniqueId}.json`,
          {
            method: 'PUT',
            body: JSON.stringify(newRequest)
          }
        );

        const responseData = await response.json();


        if(!response.ok){
            const error = new Error(responseData.message || 'Failed to send request');
            throw error;
        }

        newRequest.id = responseData.name;
        newRequest.coachId = payLoad.coachId;
        
        context.commit('addRequest', newRequest)
    },

    async fetchRequests(context){
        // const coachId = context.rootGetters.userId;
        const coachId = context.rootGetters.userId;
        const response = await fetch( `https://coaches-a06e4-default-rtdb.firebaseio.com/requests/${coachId}.json`)
        const responseData = await response.json();


        if(!response.ok){
            const error = new Error(responseData.message) || 'Failed to fetch requests';
            throw error
        }
        console.log(response)

        const requests = [];

        for(const key in responseData){
            const request = {
                id: key,
                coachId : coachId,
                userEmail: responseData[key].userEmail,
                message: responseData[key].message
            }
            requests.push(request)
        }


        context.commit('setRequests', requests);
    }
}