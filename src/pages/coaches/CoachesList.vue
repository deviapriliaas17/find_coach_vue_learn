<template>
 <div>
    <base-dialog :show="!!error" title="An error occured!" @close="handleError">
        <p>{{ error }}</p>
    </base-dialog>
    <section>
       <coach-filter @change-filter="setFilter"></coach-filter>
    </section>
    <section>
        <base-card>
            <div class="controls">
                <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
                <base-button link to="/login?red=register" v-if="!isLoggedIn">Login top Register as Coach</base-button>
                <base-button v-if="isLoggedIn && !isCoach && isLoading" link to="/register">Register as Coach</base-button>
            </div>
            <div v-if="isLoading">
                <base-spinner></base-spinner>
            </div>
            <div v-else>
                <ul v-if="hasCoaches">
                    <coach-item 
                    v-for="coach in filteredCoaches" 
                    :key="coach.id" :id="coach.id" 
                    :first-name="coach.firstName"
                    :last-name="coach.lastName"
                    :rate="coach.hourlyRate"
                    :areas="coach.areas"></coach-item>
                </ul>
                <h3 v-else>Not Found</h3>
            </div>
        </base-card>
    </section>
 </div>
</template>

<script>
import CoachItem from '../../component/coaches/CoachItem.vue'
import CoachFilter from '../../component/coaches/CoachFilter.vue'
export default {
    components:{
        CoachItem,
        CoachFilter
    },
    data(){
        return{
            isLoading:false,
            error:null,
            activeFilter:{
                frontend:true,
                backend:true,
                career:true,
            }
        }
    },
    computed:{
        filteredCoaches(){
            let coaches = this.$store.getters['coaches/coaches']
            return coaches.filter(coach =>{
                if(this.activeFilter.frontend && coach.areas.includes('frontend')){
                    return true;
                }

                if(this.activeFilter.backend && coach.areas.includes('backend')){
                    return true;
                }

                if(this.activeFilter.career && coach.areas.includes('career')){
                    return true;
                }
            })
        },
        hasCoaches(){
            return this.$store.getters['coaches/hasCoaches']
        }, 
        isCoach(){
            return this.$store.getters['coaches/isCoach']
        },
        isLoggedIn(){
            return this.$store.getters.isAuthenticated
        }
    },
    created(){
        this.loadCoaches();
    },
    methods:{
        setFilter(updatedFilter){
            this.activeFilter = updatedFilter
        },
        async loadCoaches(refresh = false){
            this.isLoading = true;
            try{
                await this.$store.dispatch('coaches/loadCoaches',{forceRefresh: refresh})
            }catch(error){
                this.error = error.message || 'Something Went Wrong!'
            }
            this.isLoading = false;
            
        },
        handleError(){
            this.error = null;
        }
    }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>