export default {
    async login(context, payload){
        const response = await fetch(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDblvyvIh5DkmlbzgZi0pibOAGTHZUtibA',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: payload.email,
              password: payload.password,
              returnSecureToken: true
            })
          }
        );
        const responseData = await response.json();

        if (!response.ok) {
          const error = new Error(
            responseData.message || 'Failed to authenticate'
          );
          throw error;
        }
        context.commit('setUser', {
          token: responseData.idToken,
          userId: responseData.localId,
          tokenExpiration: responseData.expiresIn
        });
    },
    async signup(context, payload){
        const response = await fetch(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDblvyvIh5DkmlbzgZi0pibOAGTHZUtibA',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: payload.email,
              password: payload.password,
              returnSecureToken: true
            })
          }
        );

        const responseData= await response.json();

        if(!response.ok){
            const error = new Error(responseData.message || 'Failed to authenticate');
            throw error;
        }
        context.commit('setUser', {
            token:responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        })
    },
    logout(context){
        context.commit('setUser', {
            token:null,
            userId:null,
            tokenExpiration:null,
        })
    }
}