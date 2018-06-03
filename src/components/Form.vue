<template>


  <form>
    <div class="container">

    <div v-if="$store.state.mode=='setnewwithcode'">
      <div id="inpgoup_password_change1" class="group" style="margin-bottom:30px;"> 
      <input v-on:keyup="changeinput('1',$store.state.mode)" v-on:keyup.enter="changepasswwithcode()" v-model="chpassword1" id="inpgouprecover_1" type="password" required>
      <span id="inpglabel_password_change1" class="highlight"></span>
      <span class="bar"></span>
      <label>{{$t("newpswlabel")}}</label>
    </div>
          <div id="inpgoup_password_change2" class="group" style="margin-bottom:30px;"> 
      <input v-on:keyup="changeinput('2',$store.state.mode)" v-on:keyup.enter="changepasswwithcode()" v-model="chpassword2" id="inpgouprecover_2" type="password" required>
      <span id="inpglabel_password_change2" class="highlight"></span>
      <span class="bar"></span>
      <label>{{$t("repeatnewpswlabel")}}</label>
    </div>
    </div>

    <div v-if="$store.state.mode=='login'||$store.state.mode=='register'||$store.state.mode=='recover'" id="inpgoup_email" class="group" style="margin-bottom:30px;">      
      <input v-on:keyup="changeinput('email',$store.state.mode )" v-on:keyup.enter="authLocal(email,passw,$store.state.serverUri,$store.state.mode,$store.state.loginSucceeds,$store.state.loginErr)" v-model="email" type="text" required>
      <span id="inpglabel_email" class="highlight"></span>
      <span class="bar"></span>
      <label>Email</label>
    </div>


    <div v-if="$store.state.mode=='login'||$store.state.mode=='register'" id="inpgoup_password" class="group" style="margin-bottom:30px;">      
      <input v-on:keyup="changeinput('password',$store.state.mode)" v-on:keyup.enter="authLocal(email,passw,$store.state.serverUri,$store.state.mode,$store.state.loginSucceeds,$store.state.loginErr)" v-model="passw" type="password" required>
      <span id="inpglabel_password" class="highlight"></span>
      <span class="bar"></span>
      <label>Password</label>
    </div>
      
        <span style="float:right;margin-top:-20px;margin-bottom:10px" v-if="$store.state.mode=='login'">


          <a href="javascript:void(0)" v-on:click="switchmode($store,'recover')">{{$t("passwforget")}}?</a>
        </span>
    
</div>

      <div style="margin:10px auto 30px 10px" v-if="$store.state.mode=='register'">
        <input type="checkbox" style="float:left;width:auto!important;margin-right:8px"> {{$t("accept")}} <a v-bind:href="$store.state.brand.termsLink">{{$t("termsconditions")}}</a>
        </div>

<div id="errorMsg" style="margin:5px auto 10px auto;text-align:center;height:20px;font-weight:bold;color:red"></div>
<div>

        <span v-if="$store.state.mode=='recover'">
                <a class="loginpage_button" v-bind:style="{marginLeft:'10px',backgroundColor:$store.state.style.buttonColor}" href="javascript:void(0)" v-on:click="recoverpassw($store,email,$store.state.serverUri,$store.state.mode)">

          {{$t("send")}}
                </a>
        </span>


        <span v-if="$store.state.mode=='setnewwithcode'">
                <a class="loginpage_button" v-bind:style="{marginLeft:'10px',backgroundColor:$store.state.style.buttonColor}" href="javascript:void(0)" v-on:click="changepasswwithcode($store,chpassword1,chpassword2,$store.state.serverUri)">

          {{$t("changepswbtn")}}
                </a>
        </span>

               <span v-else-if="$store.state.mode=='pwdripristined'">
                  Credenziali ripristinate!  <a href="javascript:void(0)" v-on:click="switchmode($store,'login')">{{$t("login")}} {{$t("here")}}</a>
                </span>
                <span v-else-if="$store.state.mode=='recoversended'">
                  Per finalizzare il cambio password clicca sul link che riceverai presso la tua email
                </span>
        <span v-else-if="$store.state.mode=='register'||$store.state.mode=='login'">

      <a class="loginpage_button" v-bind:style="{marginLeft:'10px',backgroundColor:$store.state.style.buttonColor}" href="javascript:void(0)" v-on:click="authLocal(email,passw,$store.state.serverUri,$store.state.mode,$store.state.loginSucceeds,$store.state.loginErr)">
        <span v-if="$store.state.mode=='register'">
          {{$t("register")}}
        </span>
        <span v-else-if="$store.state.mode=='login'">
          {{$t("login")}}
        </span>
      </a>
        </span>



    </div>
    <div v-if="!$store.state.brand.notAllowRegitration" style="margin-top:30px;text-align:center">

    
      <span v-if="$store.state.mode=='register'">{{$t("registered")}}? <a href="javascript:void(0)" v-on:click="switchmode($store,'login')">{{$t("login")}} {{$t("here")}}</a></span>
      <span v-else-if="$store.state.mode=='login'">{{$t("notamember")}}? <a href="javascript:void(0)" v-on:click="switchmode($store,'register')">{{$t("register")}} {{$t("here")}}</a></span>



</div>

      <div v-if="$store.state.mode=='recoversended'">{{$t("remembered")}}? <a href="javascript:void(0)" v-on:click="switchmode($store,'login')">{{$t("login")}} {{$t("here")}}</a></div>
      <div v-if="$store.state.mode=='recover'">{{$t("remembered")}}? <a href="javascript:void(0)" v-on:click="switchmode($store,'login')">{{$t("login")}} {{$t("here")}}</a></div>

  </form>



</template>

<script>
import * as axios from "axios";

export default {
  name: "loginform",
  methods: {
    changeinput: (iputtype, mode) => {
      console.log(mode);
      // const inputclass = document.getElementById("inpgoup_" + iputtype)
      //   .className;
      // if (inputclass.split(" ").includes("invalid")) {
      //   document.getElementById("inpgoup_" + iputtype).className = "group";
      // }
      if (mode === "setnewwithcode") {
        document.getElementById("inpgouprecover_1").className = "group";
        document.getElementById("inpgouprecover_2").className = "group";
        document.getElementById("errorMsg").style.display = "none";
      } else {
        document.getElementById("inpgoup_email").className = "group";
        if (mode != "recover")
          document.getElementById("inpgoup_password").className = "group";
        document.getElementById("errorMsg").style.display = "none";
      }
    },
    authLocal: (e, p, serverUri, R, callback, loginErr) => {
      const that = this;
      function showError(error) {
        document.getElementById("errorMsg").innerHTML = error;
        document.getElementById("errorMsg").style.display = "block";
      }
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

        if (errrr.length) {
          showError("credenziali errate");
          return setError(errrr);
        }
        e = e.replace(/ /g, "");
        if (R === "register") {
          axios
            .post(serverUri + "/auth/local/register", { email: e, passwd: p })
            .then(function(answer) {
              if (answer && !answer.data.error && !answer.error) {
                callback(answer.data);
              } else if (answer.data.error) {
                console.error(answer.data.error);
                setError(["email", "password"]);
                if (answer.data.error === "unauthorized") {
                  showError("account non autorizzato");
                } else {
                  showError(answer.data.error);
                }
                if (loginErr)
                  loginErr({
                    type: "validation",
                    entry: ["email", "password"]
                  });
              } else if (answer.error) {
                console.error(answer.error);
                setError(["email", "password"]);
                showError(answer.error);
                if (loginErr)
                  loginErr({
                    type: "validation",
                    entry: ["email", "password"]
                  });
              } else {
                console.error("");
                setError(["email", "password"]);
                showError("undefined error");
                if (loginErr)
                  loginErr({
                    type: "validation",
                    entry: ["email", "password"]
                  });
              }
            })
            .catch(function(err) {
              console.error(err);
              setError(["email", "password"]);
              showError("server error");
              loginErr({ invalid: ["email", "password"] });
            });
        } else {
          axios
            .post(serverUri + "/auth/local/login", { email: e, passwd: p })
            .then(function(answer) {
              if (answer && !answer.data.error && !answer.error) {
                callback(answer.data);
              } else if (answer.data.error) {
                console.error("", answer.data.error);
                if (answer.data.error === "unauthorized") {
                  showError("account non autorizzato");
                } else {
                  showError(answer.data.error);
                }
                setError(["email", "password"]);
                if (loginErr)
                  loginErr({
                    type: "validation",
                    entry: ["email", "password"]
                  });
              } else if (answer.error) {
                console.error(answer.error);
                setError(["email", "password"]);
                showError(answer.error);
                if (loginErr)
                  loginErr({
                    type: "validation",
                    entry: ["email", "password"]
                  });
              } else {
                console.error("");
                setError(["email", "password"]);
                showError("undefined error");
                if (loginErr)
                  loginErr({
                    type: "validation",
                    entry: ["email", "password"]
                  });
              }
            })
            .catch(function(err) {
              console.error(err);
              setError(["email", "password"]);
              showError("server error");
              if (loginErr)
                loginErr({ type: "validation", entry: ["email", "password"] });
            });
        }
      } else if (!e && !p) {
        setError(["email", "password"]);
        showError("Inserire credenziali");
        if (loginErr)
          loginErr({ type: "validation", entry: ["email", "password"] });
      } else if (!e) {
        setError(["email"]);
        showError("Email errata");
        showError("Inserire Email");
        document.getElementById("inpgoup_password").className = "group";
        if (loginErr)
          loginErr({ type: "validation", entry: ["email", "password"] });
      } else if (!p) {
        setError(["password"]);
        showError("Inserire Password");
        document.getElementById("inpgoup_email").className = "group";
        if (loginErr)
          loginErr({ type: "validation", entry: ["email", "password"] });
      } else {
        console.error("??????");
        setError(["email", "password"]);
        showError("Errore indefinito");
        if (loginErr)
          loginErr({ type: "validation", entry: ["email", "password"] });
      }
    },
    recoverpassw: (s, e, serverUri, mode) => {
      const that = this;
      function showError(error) {
        document.getElementById("errorMsg").innerHTML = error;
        document.getElementById("errorMsg").style.display = "block";
        console.error(error);
        console.error(JSON.stringify(error));
      }
      function setError(errors) {
        for (let i = 0; i < errors.length; i++) {
          document.getElementById("inpgoup_" + errors[i]).className =
            "group invalid";
          // document.getElementById("inpglabel_" + errors[i]).className = "invalid";
          console.error("validate error " + errors[i]);
        }
      }
      if (!e) {
        setError(["email"]);
        return showError("Email errata");
      }

      if (
        e.length < 5 ||
        e.split("@").length !== 2 ||
        e.split(".").length < 2
      ) {
        showError("email errata");
        return setError(["email"]);
      }

      const datatosend = {
        email: e,
        redirectTo: location.href + "?setnewwithcode=true",
        subject: s.state.recoverMail.subject,
        from: s.state.recoverMail.from,
        companyName: s.state.recoverMail.companyName
      };

      axios
        .post(serverUri + "/auth/local/recovergen", datatosend)
        .then(answer => {
          console.log(answer.data);
          if (!answer.data) {
            setError(["email"]);
            return showError("Errore indefinito");
          } else if (answer.data.error) {
            setError(["email"]);
            return showError(answer.data.error);
          } else if (answer.data.ok) {
            s.commit("switchMode", "recoversended");
            return console.log("sended request for password reset");
          } else {
            setError(["email"]);
            return showError("unknown response from server: " + answer.data);
          }
        })
        .catch(err => {
          setError(["email"]);
          return showError("wrong response from server: " + err);
        });
    },
    changepasswwithcode: (s, p1, p2, serverUri) => {
      const that = this;
      function showError(error) {
        document.getElementById("errorMsg").innerHTML = error;
        document.getElementById("errorMsg").style.display = "block";
        console.error(error);
        console.error(JSON.stringify(error));
      }
      function setError(errors) {
        console.log("ersssssssssssssrors", errors);
        for (let i = 0; i < errors.length; i++) {
          console.log("inpglabel_password_change" + errors[i]);
          document.getElementById(
            "inpglabel_password_change" + errors[i]
          ).className =
            "group invalid";
          // document.getElementById("inpglabel_" + errors[i]).className = "invalid";
          console.error("validate error " + errors[i]);
        }
      }
      if (p1 && p2) {
        let errrr = [];

        if (p1.length < 5) {
          errrr.push("1");
        }

        if (p1 !== p2) {
          errrr.push("2");
        }

        if (errrr.length > 0) {
          showError("password " + errrr + " errata");
          return setError(errrr);
        }
        if (!window.location.href.split("pwtoken=")[1]) {
          showError("code inesistent");
          return setError("code inesistent");
        }
        axios
          .post(serverUri + "/auth/local/recoverpw", {
            code: window.location.href.split("pwtoken=")[1].split("&")[0],
            updatedPassword: p1
          })
          .then(answer => {
            console.log(answer.data);
            if (!answer.data) {
              setError(["1", "2"]);
              return showError("Errore indefinito");
            } else if (answer.data.error) {
              setError(["1", "2"]);
              return showError(answer.data.error);
            } else if (answer.data.ok) {
              document.getElementById("inpgouprecover_1").className = "group";
              document.getElementById("inpgouprecover_2").className = "group";
              document.getElementById("errorMsg").style.display = "none";
              s.commit("switchMode", "pwdripristined");
              return console.log("sended request for password reset");
            } else {
              setError(["1", "2"]);
              return showError("unknown response from server: " + answer.data);
            }
          })
          .catch(err => {
            setError(["email"]);
            return showError("wrong response from server: " + err);
          });
      } else if (!p1) {
        showError("password error");
        return setError(["1"]);
      } else if (!p2) {
        showError("password diverse");
        return setError(["2"]);
      }
    },
    switchmode: (s, m) => {
      // console.log(s.state.mode); // -> 1

      s.commit("switchMode", m);
      // console.log(s.state.mode); // -> 1
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