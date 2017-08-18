<template>
  <div id="mainlogincontainer" v-bind:style="{backgroundColor:$store.state.style.backgroundColor}">
    <div id="innerlogincontainer" style="height: 100vh;width:100vw;display:flex;justifyContent:center;alignItems:center">
      <!--
              <div class="desktop" style="position:absolute;left:6vw;top:6vh">
                <div style="font-size:40px;font-weight:bold">{{$store.state.brand.title}}</div>
              </div>
              -->
      <div id="loginarea" v-bind:style="{borderColor:$store.state.style.contentBorderColor}">
        <div style="text-align:center">
          <div style="font-size:34px;font-weight:bold;margin-top:25px;text-shadow:1px 1px 8px #a5a5a5;">
            <div style="height:60px;line-height:60px">
              <img style="float:left;max-height:60px" v-bind:src="$store.state.brand.logoImg" />
              <div style="display:inline-block">{{$store.state.brand.title}}</div>
            </div>
          </div>
          <div style="margin:25px auto 15px auto;font-size:26px">

            <span v-if="$store.state.registerMode">{{$t("register")}}</span>
            <span v-else>{{$t("login")}}</span>
            {{$t("with")}}

          </div>

        </div>
        <div style="text-align:center;margin-bottom:10px">
          <span style="width:80px;text-align:center;display:inline-block" v-for="a in authenticators">
            <providerlink v-bind:authenticator="a" />
          </span>
        </div>
        <div style="width: 100%; height: 20px; border-bottom: 1px solid black; text-align: center">
          <span style="font-size: 30px; background-color: white; padding: 0 20px;">
            {{$t("or")}}
            <!--Padding is optional-->
          </span>
        </div>
        <loginform />
      </div>
      <div id="login_footer" v-bind:style="{backgroundColor:$store.state.style.footerColor,position:'absolute',bottom:'0px',width:'100%',borderTop:'solid 1px',borderTopColor:$store.state.style.footerBorderColor,paddingBottom:'5px'}">

        <div style="margin:10px auto 5px 10px;font-weight:bold">
          {{$store.state.brand.credits}}
        </div>
        <div style="margin-left:15px" class="loginpage_smallestsize">

          <div style="float:left;margin:5px 0px 0px 0px">Login page by dottgonzo</div>
          <div style="float:right;margin:5px 10px auto auto">
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
#loginarea {
  padding: 5vw;
  max-width: 500px;
  margin: auto;
  position: absolute;
  margin-top: -5vh;
  background-color: white;
  border: 1px solid
}




/* -----------------------------------
IPHONE 
------------------------------------ */

@media only screen and (max-width: 450px) {
  .loginpage_smallestsize {
    font-size: 8px
  }
}

@media only screen and (min-width: 451px) and (max-width: 500px) {
  .loginpage_smallestsize {
    font-size: 10px
  }
}

@media only screen and (min-width: 501px) {
  .loginpage_smallestsize {
    font-size: 12px
  }
}

@media only screen and (max-height: 570px) {
  #innerlogincontainer {
    display: block!important;
    width: auto!important;
    height: auto!important;
  }
  #loginarea {
    position: inherit!important
  }
  .desktop {
    display: none
  }
  #login_footer {
    display: block!important;
    position: inherit!important
  }
}

@media only screen and (min-height: 751px) {}
</style> 