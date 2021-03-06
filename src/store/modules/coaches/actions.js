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
       const token = context.rootGetters.token;
       const response = await fetch(
         `https://coaches-a06e4-default-rtdb.firebaseio.com/coaches/${userId}.json?uth=`+token,
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
   },
    async loadCoaches(context, payLoad){

        if(!payLoad.forceRefresh && !context.getters.shouldUpdate){
          return;
        }

        const response = await fetch(
         `https://coaches-a06e4-default-rtdb.firebaseio.com/coaches.json`);

         const responseData = await response.json();
         
         if(!response.ok){
            const error = new Error(responseData.message || 'Failed to Fetch')
            throw error;
         }

         const coaches = [];

         for(const key in responseData){
             const coach = {
               id: key,
               firstName: responseData[key].firstName,
               lastName: responseData[key].lastName,
               description: responseData[key].description,
               hourlyRate: responseData[key].hourlyRate,
               areas: responseData[key].areas
             };
             coaches.push(coach)
         }

         context.commit('setCoaches', coaches)
         context.commit('setFetchTimestamp')
   }
};