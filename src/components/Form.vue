<template>


  <form>
    <div class="container">


    <div id="inpgoup_email" class="group" style="margin-bottom:30px;">      
      <input v-on:keyup="changeinput('email')" v-on:keyup.enter="authLocal(email,passw,$store.state.serverUri,$store.state.registerMode,$store.state.loginSucceeds)" v-model="email" type="text" required>
      <span id="inpglabel_email" class="highlight"></span>
      <span class="bar"></span>
      <label>Email</label>
    </div>


    <div id="inpgoup_password" class="group" style="margin-bottom:30px;">      
      <input v-on:keyup="changeinput('password')" v-on:keyup.enter="authLocal(email,passw,$store.state.serverUri,$store.state.registerMode,$store.state.loginSucceeds)" v-model="passw" type="password" required>
      <span id="inpglabel_password" class="highlight"></span>
      <span class="bar"></span>
      <label>Password</label>
    </div>
      

    
</div>

      <div style="margin:10px auto 30px 10px" v-if="$store.state.registerMode">
        <input type="checkbox" style="float:left;width:auto!important;margin-right:8px"> {{$t("accept")}} <a v-bind:href="$store.state.brand.termsLink">{{$t("termsconditions")}}</a>
        </div>


<div>
      <a class="loginpage_button" v-bind:style="{marginLeft:'10px',backgroundColor:$store.state.style.buttonColor}" href="javascript:void(0)" v-on:click="authLocal(email,passw,$store.state.serverUri,$store.state.registerMode,$store.state.loginSucceeds)">
        <span v-if="$store.state.registerMode">
          {{$t("register")}}
        </span>
        <span v-else>
          {{$t("login")}}
        </span>

      </a>
    </div>
    <div v-if="!$store.state.brand.notAllowRegitration" style="margin-top:30px;text-align:center">

    
      <span v-if="$store.state.registerMode">{{$t("registered")}}? <a href="javascript:void(0)" v-on:click="switchmode($store)">{{$t("login")}} {{$t("here")}}</a></span>
      <span v-else>{{$t("notamember")}}? <a href="javascript:void(0)" v-on:click="switchmode($store)">{{$t("register")}} {{$t("here")}}</a></span>



</div>

  </form>



</template>

<script>
import * as axios from "axios";

export default {
  name: "loginform",
  methods: {
    changeinput: iputtype => {
      // const inputclass = document.getElementById("inpgoup_" + iputtype)
      //   .className;
      // if (inputclass.split(" ").includes("invalid")) {
      //   document.getElementById("inpgoup_" + iputtype).className = "group";
      // }
      document.getElementById("inpgoup_email").className = "group";
      document.getElementById("inpgoup_password").className = "group";
    },
    authLocal: (e, p, serverUri, R, callback) => {
      const that = this;

      function setError(errors) {
        for (let i = 0; i < errors.length; i++) {
          document.getElementById("inpgoup_" + errors[i]).className =
            "group invalid";
          // document.getElementById("inpglabel_" + errors[i]).className = "invalid";
          console.error("validate error " + errors[i]);
        }
      }

      if (e && p) {
        // console.log("email: " + e + " password: " + p + " serverUri: " + serverUri);
        let errrr = [];
        if (
          e.length < 5 ||
          e.split("@").length !== 2 ||
          e.split(".").length < 2
        ) {
          errrr.push("email");
        }

        if (p.length < 5) {
          errrr.push("password");
        }

        if (errrr.length) return setError(errrr);

        if (R) {
          axios
            .post(serverUri + "/auth/local/register", { email: e, passwd: p })
            .then(function(answer) {
              if (answer && !answer.data.error && !answer.error) {
                callback(answer.data);
              } else if (answer.data.error) {
                console.error(answer.data.error);
                setError(["email", "password"]);
              } else if (answer.error) {
                console.error(answer.error);
                setError(["email", "password"]);
              } else {
                console.error("");
                setError(["email", "password"]);
              }
            })
            .catch(function(err) {
              console.error(err);
              setError(["email", "password"]);
            });
        } else {
          axios
            .post(serverUri + "/auth/local/login", { email: e, passwd: p })
            .then(function(answer) {
              if (answer && !answer.data.error && !answer.error) {
                callback(answer.data);
              } else if (answer.data.error) {
                console.error('',answer.data.error);
                setError(["email", "password"]);
              } else if (answer.error) {
                console.error(answer.error);
                setError(["email", "password"]);
              } else {
                console.error("");
                setError(["email", "password"]);
              }
            })
            .catch(function(err) {
              console.error(err);
              setError(["email", "password"]);
            });
        }
      } else if (!e && !p) {
        setError(["email", "password"]);
      } else if (!e) {
        setError(["email"]);
        document.getElementById("inpgoup_password").className = "group";
      } else if (!p) {
        setError(["password"]);
        document.getElementById("inpgoup_email").className = "group";
      } else {
        console.error("??????");
        setError(["email", "password"]);
      }
    },
    switchmode: s => {
      // console.log(s.state.registerMode); // -> 1

      s.commit("switchMode");
      // console.log(s.state.registerMode); // -> 1
    }
  }
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}

/* basic stylings ------------------------------------------ */
.loginpage_button {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 13px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

.container {
  font-family: "Roboto";

  margin-top: 30px;
  display: block;
  padding: 10px 10px 0px 10px;
}

/* form starting stylings ------------------------------- */
.group {
  position: relative;
}
input {
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-bottom: 1px solid #757575;
}
input:focus {
  outline: none;
}

/* LABEL ======================================= */
label {
  color: #999;
  font-size: 18px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

/* active state */
input:focus ~ label,
input:valid ~ label {
  top: -20px;
  font-size: 14px;
  color: #5264ae;
}

/* BOTTOM BARS ================================= */
.bar {
  position: relative;
  display: block;
  width: 100%;
}
.bar:before,
.bar:after {
  content: "";
  height: 2px;
  width: 0;
  bottom: 1px;
  position: absolute;
  background: #5264ae;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}
.bar:before {
  left: 50%;
}
.bar:after {
  right: 50%;
}

/* active state */
input:focus ~ .bar:before,
input:focus ~ .bar:after {
  width: 50%;
}

/* HIGHLIGHTER ================================== */
.highlight {
  position: absolute;
  height: 60%;
  width: 100px;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;
}

/* active state */
input:focus ~ .highlight {
  -webkit-animation: inputHighlighter 0.3s ease;
  -moz-animation: inputHighlighter 0.3s ease;
  animation: inputHighlighter 0.3s ease;
}

/*
 # validation
*/
.group .err-message {
  display: none;
}
.group.invalid input {
  color: #da4439;
  border-bottom: 1px solid #da4439;
}
.group .err-message {
  display: none;
}
.group.invalid .err-message {
  margin: 0;
  display: block;
  position: absolute;

  bottom: 0;
  margin-bottom: -1.2em;
  left: 0;
  color: #da4439;
  font-size: 0.6rem;
}
.group.invalid .bar:before,
.group.invalid .bar:after {
  background-color: #da4439;
}

/* ANIMATIONS ================ */
@-webkit-keyframes inputHighlighter {
  from {
    background: #5264ae;
  }
  to {
    width: 0;
    background: transparent;
  }
}
@-moz-keyframes inputHighlighter {
  from {
    background: #5264ae;
  }
  to {
    width: 0;
    background: transparent;
  }
}
@keyframes inputHighlighter {
  from {
    background: #5264ae;
  }
  to {
    width: 0;
    background: transparent;
  }
}
</style>