<template>
    <form>
        <base-card>
            <div class="form-control">
                <label for="email">E-Mail</label>
                <input type="email" id="email">
            </div>
            <div class="form-control">
                <label for="password">Password</label>
                <input type="password" id="password">
            </div>
            <base-button>Login</base-button>
            <base-button type="button" mode="flat">Sign Up</base-button>
        </base-card>
    </form>
</template>

<script>
    export default{
        data(){
            return{
                email:'',
                password:''
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