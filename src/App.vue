<template>
  <div v-bind:style="{backgroundColor:$store.state.style.backgroundColor}">
    <div style="height: 100vh;width:100vw;display:flex;justifyContent:center;alignItems:center">
      <div style="position:absolute;left:5vw;top:3vh">
        <h1>{{$store.state.brand.title}}</h1>
      </div>
      <div style="padding:2vw;max-width:500px;margin:auto;position:absolute;margin-top:-5vh;background-color:white">
        <div style="text-align:center">
          <div style="margin:auto auto 30px auto;font-size:34px">login with</div>
  
        </div>
        <div style="text-align:center;margin-bottom:10px">
          <span style="width:80px;text-align:center;display:inline-block" v-for="a in authenticators">
            <providerlink v-bind:authenticator="a" />
          </span>
        </div>
        <div style="width: 100%; height: 22px; border-bottom: 1px solid black; text-align: center">
          <span style="font-size: 34px; background-color: white; padding: 0 20px;">
            or
            <!--Padding is optional-->
          </span>
        </div>
        <loginform />
      </div>
      <div style="position:absolute;bottom:0px;background-color:green;width:100%">
        <div>
          {{$store.state.brand.credits}}
        </div>
  
        <div style="float:left">Login page by dottgonzo</div>
  
        <div style="float:right">
          <div>Icons made by
            <a href="https://www.flaticon.com/authors/pixel-buddha" title="Pixel Buddha">Pixel Buddha</a> from
            <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by
            <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
          </div>
        </div>
      </div>
    </div>
  
  </div>
</template>

<script>
import Loginform from './components/Form.vue'
import Providerlink from './components/Providerlink.vue'
import * as oAuth2 from 'oauth2-js-lib'

export default {
  name: 'app',
  components: {
    Loginform,
    Providerlink
  },
  computed: {
    authenticators() {
      return this.$store.state.authenticators
    }
  },
  mounted() {
    const lman = new oAuth2.authComposer(this.$store.state.serverUri, this.$store.state.authenticators)
    lman.onLogin(this.$store.state.loginSucceeds)
  }
}
</script>
<style scoped>
/* -----------------------------------
IPHONE 
------------------------------------ */

@media only screen and (max-width: 320px) {
  .desktop {
    display: none
  }
  .mobile {
    display: block
  }
}




/* -----------------------------------
IPAD PORTRAIT
------------------------------------ */

@media only screen and (min-width: 768px) {
  .desktop {
    display: block
  }
  .mobile {
    display: none
  }
}





/* -----------------------------------
IPAD LANDSCAPE + NETBOOK
------------------------------------ */

@media only screen and (min-width: 1024px) {
  .mobile {
    display: none
  }
}




/* -----------------------------------
DESKTOP
------------------------------------ */

@media only screen and (min-width: 1200px) {
  .mobile {
    display: none
  }
}
</style> 