<template>
    <div>
      <base-dialog :show="!!error" title="Error occured">
        <p>{{ error }}</p>
      </base-dialog>
      <base-dialog :show="isLoading" title="Authenticating...." fixed>
        <base-spinner></base-spinner>
      </base-dialog>
      <base-card>
            <form>
                  <div class="form-control">
                      <label for="email">E-Mail</label>
                      <input type="email" id="email" v-model.trim="email">
                  </div>
                  <div class="form-control">
                      <label for="password">Password</label>
                      <input type="password" id="password" v-model.trim="password">
                  </div>
                  <p v-if="!formIsValid">Please enter a valid email and password (muest be at least 6 character)</p>
                  <base-button @click="submitForm" type="button">{{ submitButtonCaption }}</base-button>
                  <base-button type="button" mode="flat" @click="switchAuthMode">{{ switchModeButtonCaption }}</base-button>
          </form>
      </base-card>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                email:'',
                password:'',
                formIsValid: true,
                mode:'login',
                isLoading:false,
            }
        },
        computed:{
            submitButtonCaption(){
              if(this.mode === 'login'){
                return 'Login'
              }else{
                return 'Sign Up'
              }
            }, 
            switchModeButtonCaption(){
              if(this.mode === 'login'){
                return 'Sign Up Instead';
              }else{
                return 'Login Instead';
              }
            }
        },
        methods:{
         async submitForm(){
            const actionPayLoad = {
              email:this.email,
              password:this.password
            }

            this.formIsValid = true;
            if(this.email == '' || !this.email.includes('@') || this.password.length < 6){
              this.formIsValid = false;
              return;
            } 
            this.isLoading = true;
            try{
              if(this.mode === 'login'){
               await this.$store.dispatch('login',actionPayLoad)
              }else{
                await this.$store.dispatch('signup',actionPayLoad)
              }
              const redirectUrl = '/' + (this.$route.query.red || 'coaches');
              this.$router.replace(redirectUrl);
            }catch(err){
              this.error = err.message || 'Failed To authenticate'
            }

            this.isLoading = false;
          },
          switchAuthMode(){
            if(this.mode == 'login'){
              this.mode = 'signup'
            }else{
              this.mode = 'login'
            }
          }
        }
    }
</script>


<style scoped>
.form-control {
  margin: 1rem;
  padding: 1rem;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>