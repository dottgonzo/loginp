<template>
 <span>
<a href="javascript:void(0)" v-bind:id="authenticator.button_id"> 
    
    <providericon v-bind:provider="authenticator.provider"></providericon>
    </a>
 </span>
</template>

<script>
import Providericon from './Providericon.vue'
export default {
    components:{
Providericon
    },
  name: 'providerlink',
  props:['authenticator'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
