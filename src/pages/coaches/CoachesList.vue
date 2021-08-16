<template>
    <section>
       <coach-filter @change-filter="setFilter"></coach-filter>
    </section>
    <section>
        <base-card>
            <div class="controls">
                <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
                <base-button v-if="!isCoach" link to="/register">Register as Coach</base-button>
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
        }
    },
    created(){
        this.loadCoaches();
    },
    methods:{
        setFilter(updatedFilter){
            this.activeFilter = updatedFilter
        },
        async loadCoaches(){
            this.isLoading = true;
            await this.$store.dispatch('coaches/loadCoaches')
            this.isLoading = false;
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