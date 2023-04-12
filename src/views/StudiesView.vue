<template>
   <div class="about">
      <div class="text-center mb-6">
         <h1 class="text-2xl">Studies list</h1>
      </div>

      <!-- TODO: Load a modal when the button is clicked -->
      <div data-info="This is the consent document" class="modal-box- hidden-" >
         <div class="modal-box" :class="isClicked ? 'block' : 'hidden'">
            <!-- Generated using cupcakeipsum -->
            <p>Caramels marzipan cheesecake lemon drops biscuit cookie. Pudding topping marzipan brownie oat cake pudding bonbon. Cupcake tootsie roll oat cake
            chocolate cake halvah tiramisu candy tiramisu candy canes. Danish chocolate fruitcake jelly-o halvah apple pie bear claw. Croissant caramels ice cream
            sweet tart. Gummies lollipop sugar plum biscuit tiramisu pudding donut tiramisu wafer. Liquorice toffee lemon drops danish sesame snaps toffee jujubes
            lollipop. Biscuit candy canes dragée oat cake jelly-o powder bear claw candy candy canes. Gummi bears carrot cake biscuit chocolate bar tart wafer
            candy jelly-o. Dessert jelly beans pudding dessert tiramisu. Bonbon carrot cake powder jujubes chocolate bar jelly gingerbread dragée apple pie. Pie
            caramels cotton candy chocolate bar oat cake. Cupcake jujubes caramels soufflé liquorice jujubes lollipop tart. Macaroon chocolate bar dessert apple
            pie tart bear claw sweet roll.
            </p>
            <button @click="showConsent" type="button" class="rounded px-4 bg-pink-500 my-4 float-right">Close</button>
         </div>
      </div>
      <p class="mb-6">
         Before you join any study, it would be great if you could read the
         <button type="button" class="consent rounded px-2" @click="showConsent">consent sheet</button>.
         <!-- <button type="button" class="consent rounded px-2" @click="showConsent">consent sheet</button>. -->
      </p>

      <!-- TODO: Create the study list -->
      <div class="grid grid-cols-12 md:gap-4">
         <div class="studies col-span-full md:col-span-4 bg-white p-4 rounded-lg mb-8 md:mb-0" v-for="study in studyList" :key="study"> 
            <p><span>Study Name: </span>{{ study.name }} </p>
            <p><span>Run By: </span>{{ study.researcher }}</p>
            <p><span>Status: </span><span >{{study.joined == true ? 'Enrolled' : study.joined == null ? 'Not Started' : 'Withdrawn'}}</span></p>
            <button @click="studyStatus(study)" type="button" class="rounded px-4 bg-pink-500 mt-4" 
               :class="study.joined ? 'bg-pink-500' : 'bg-green-500 text-white'">
               {{study.joined ? 'Leave Study' : 'Join Study'}}
            </button>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { axios } from "@/api/api";
// import { computed } from "vue";
import { ref } from "vue";

let studyList = ref([]);
let isClicked = ref(false);

// TODO: fetch your list of data using the imported axios instance (API)
axios.get(`/home-test/users/1337/studies`)
.then(response => {
   studyList.value = response.data.userStudies
   console.log(studyList)
})

// methods
// -----------------------------------------
function showConsent() {
   isClicked.value = !isClicked.value;
}

function studyStatus(element){
   if(!element.joined){
      axios.put(`/home-test/users/1337/studies/${element.id}`, {...element, joined: true})
      .then( response => {
         console.log("Response: ", response);
         element.joined = response.data.joined;
      })
   }else{
      axios.delete(`/home-test/users/1337/studies/${element.id}`, element)
      .then(response => {
         console.log('Delete response: ', response);
         element.joined = false;
      })
   }
}


</script>

<style lang="scss">
button.consent {
   background-color: var(--vt-sano-green);
   color: var(--vt-white);
   border: 1px solid var(--vt-white);
}

.studies{
   p{
      border-bottom: 1px solid;
      @apply flex justify-between border-pink-400;
   }
}

.modal-box{
   @apply fixed z-50 p-8 bg-white rounded-3xl;
}
</style>
