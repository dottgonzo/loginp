<template>
  <div id="mainlogincontainer" v-bind:style="{backgroundColor:$store.state.style.backgroundColor}">
    <div id="innerlogincontainer" style="height: 100vh;width:100vw;display:flex;justifyContent:center;alignItems:center">
      <div class="desktop" style="position:absolute;left:5vw;top:3vh">
        <h1>{{$store.state.brand.title}}</h1>
      </div>
      <div style="padding:2vw;max-width:500px;margin:auto;position:absolute;margin-top:-5vh;background-color:white">
        <div style="text-align:center">
          <div style="margin:auto auto 30px auto;font-size:34px">

            <span v-if="$store.state.registerMode">register</span>
            <span v-else>login</span>
            with

          </div>

        </div>
        <div style="text-align:center;margin-bottom:10px">
          <span style="width:80px;text-align:center;display:inline-block" v-for="a in authenticators">
            <providerlink v-bind:authenticator="a" />
          </span>
        </div>
        <div style="width: 100%; height: 20px; border-bottom: 1px solid black; text-align: center">
          <span style="font-size: 30px; background-color: white; padding: 0 20px;">
            or
            <!--Padding is optional-->
          </span>
        </div>
        <loginform />
      </div>
      <div v-bind:style="{backgroundColor:$store.state.style.footerColor,position:'absolute',bottom:'0px',width:'100%'}">
        <div style="margin:5px;font-weight:bold">
          {{$store.state.brand.credits}}
        </div>
        <div style="margin-left:5px" class="loginpage_smallestsize">

          <div style="float:left;margin:5px">Login page by dottgonzo</div>
          <div style="float:right;margin:auto 10px auto auto">
            <div>Icons made by
              <a href="https://www.flaticon.com/authors/pixel-buddha" title="Pixel Buddha">Pixel Buddha</a> from
              <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by
              <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
            </div>
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
  .loginpage_smallestsize {
    font-size: 8px
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
  .loginpage_smallestsize {
    font-size: 12px
  }
}







/* -----------------------------------
IPAD LANDSCAPE + NETBOOK
------------------------------------ */

@media only screen and (min-width: 1024px) {
  .mobile {
    display: none
  }
  .loginpage_smallestsize {
    font-size: 12px
  }
}






/* -----------------------------------
DESKTOP
------------------------------------ */

@media only screen and (min-width: 1200px) {
  .mobile {
    display: none
  }
  .loginpage_smallestsize {
    font-size: 14px
  }
}
</style> 