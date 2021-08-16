export default{
   async registerCoach(context, data){
        const userId = context.rootGetters.userId;
        const coachData = {
            id:context.rootGetters.userId,
            firstName: data.first,
            lastName:data.last,
            description:data.description,
            hourlyRate:data.rate,
            areas:data.areas
        }
       const response = await fetch(
         `https://coaches-a06e4-default-rtdb.firebaseio.com/coaches/${userId}.json`,
         {
           method: 'PUT',
           body: JSON.stringify(coachData)
         }
       );

        // const responseData = await response.json();

        if(!response.ok){
            // error
        }

        context.commit('registerCoach',{
            ...coachData,
            id:userId
        })
    }
}