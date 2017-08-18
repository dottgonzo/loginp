<template>


  <form>
    <div class="container">


    <div class="group" style="margin-bottom:30px;">      
      <input v-model="passw" type="text" required>
      <span class="highlight"></span>
      <span class="bar"></span>
      <label>Email</label>
    </div>


    <div class="group" style="margin-bottom:30px;">      
      <input v-model="email" type="text" required>
      <span class="highlight"></span>
      <span class="bar"></span>
      <label>Password</label>
    </div>
      

    
</div>
<div>
      <a style="margin-left:10px" href="javascript:void(0)" v-on:click="authLocal(email,passw,$store.state.serverUri,$store.state.registerMode,$store.state.loginSucceeds)">
        <span v-if="$store.state.registerMode">
          Register
        </span>
        <span v-else>
          Login
        </span>

      </a>
    </div>
    <div style="margin-top:50px;text-align:center">

    
      <span v-if="$store.state.registerMode"><a href="javascript:void(0)" v-on:click="switchmode($store)">login</a></span>
      <span v-else>Not a member? <a href="javascript:void(0)" v-on:click="switchmode($store)">register here</a></span>
    </a>



</div>

  </form>



</template>

<script>
import * as axios from 'axios'

export default {
  name: 'loginform',
  methods: {
    authLocal: (e, p, serverUri, R, callback) => {
      const that = this
      if (e && p) {
        console.log('email: ' + e + ' password: ' + p + ' serverUri: ' + serverUri)

        if (R) {

          axios.post(serverUri + '/auth/local/register', { email: e, passwd: p }).then(function (answer) {
            if (answer && !answer.error) {
              console.log(answer.data)
              callback(answer.data)
            } else if (answer.error) {
              throw Error(answer.error)

            } else {
              throw Error('')

            }
          }).catch(function (err) {
            throw Error(err)
          })





        } else {



          axios.post(serverUri + '/auth/local/login', { email: e, passwd: p }).then(function (answer) {
            if (answer && !answer.error) {
              console.log(answer.data)
              callback(answer.data)

            } else if (answer.error) {
              throw Error(answer.error)

            } else {
              throw Error('')

            }
          }).catch(function (err) {
            throw Error(err)
          })

        }


      } else {
        console.log('provide user and password')

      }
    },
    switchmode: (s) => {
      console.log(s.state.registerMode) // -> 1

      s.commit('switchMode')
      console.log(s.state.registerMode) // -> 1

    }
  }
}
</script>
<style scoped>
* { box-sizing:border-box; }

/* basic stylings ------------------------------------------ */


.container 		{ 
  font-family:'Roboto';

margin-top:30px;
  display:block; 
  padding:10px 10px 0px 10px;
}

/* form starting stylings ------------------------------- */
.group 			  { 
  position:relative; 
}
input 				{
  font-size:18px;
  padding:10px 10px 10px 5px;
  display:block;
  width:100%;
  border:none;
  border-bottom:1px solid #757575;
}
input:focus 		{ outline:none; }

/* LABEL ======================================= */
label 				 {
  color:#999; 
  font-size:18px;
  font-weight:normal;
  position:absolute;
  pointer-events:none;
  left:5px;
  top:10px;
  transition:0.2s ease all; 
  -moz-transition:0.2s ease all; 
  -webkit-transition:0.2s ease all;
}

/* active state */
input:focus ~ label, input:valid ~ label 		{
  top:-20px;
  font-size:14px;
  color:#5264AE;
}

/* BOTTOM BARS ================================= */
.bar 	{ position:relative; display:block; width:100%; }
.bar:before, .bar:after 	{
  content:'';
  height:2px; 
  width:0;
  bottom:1px; 
  position:absolute;
  background:#5264AE; 
  transition:0.2s ease all; 
  -moz-transition:0.2s ease all; 
  -webkit-transition:0.2s ease all;
}
.bar:before {
  left:50%;
}
.bar:after {
  right:50%; 
}

/* active state */
input:focus ~ .bar:before, input:focus ~ .bar:after {
  width:50%;
}

/* HIGHLIGHTER ================================== */
.highlight {
  position:absolute;
  height:60%; 
  width:100px; 
  top:25%; 
  left:0;
  pointer-events:none;
  opacity:0.5;
}

/* active state */
input:focus ~ .highlight {
  -webkit-animation:inputHighlighter 0.3s ease;
  -moz-animation:inputHighlighter 0.3s ease;
  animation:inputHighlighter 0.3s ease;
}

/* ANIMATIONS ================ */
@-webkit-keyframes inputHighlighter {
	from { background:#5264AE; }
  to 	{ width:0; background:transparent; }
}
@-moz-keyframes inputHighlighter {
	from { background:#5264AE; }
  to 	{ width:0; background:transparent; }
}
@keyframes inputHighlighter {
	from { background:#5264AE; }
  to 	{ width:0; background:transparent; }
}

</style>