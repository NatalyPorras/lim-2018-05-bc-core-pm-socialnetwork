(function ($) {
  "use strict";



  //  [ Focus input ]
  $('.input100').each(function () {
    $(this).on('blur', function () {
      if ($(this).val().trim() != "") {
        $(this).addClass('has-val');
      }
      else {
        $(this).removeClass('has-val');
      }
    })
  })

  const register = document.querySelector("#singUp");
  const getEmail = document.querySelector('#email');
  const getPassword = document.querySelector('#password');
  const logIn = document.querySelector("#log-In")
  const loginGoogle = document.querySelector('#login-google');
  const loginFacebook = document.querySelector('#login-facebook');
  const loginTwitter = document.querySelector('#login-twitter');
  const forgotPassword = document.querySelector('#forgot-Password');

  register.addEventListener('click', (e) => {
    if (e.preventDefault) {
      window.location.assign('signup.html')
    }
  })

  logIn.addEventListener('click', () => {
    firebase.auth().signInWithEmailAndPassword(getEmail.value, getPassword.value).then(() => {
      window.location.assign('main.html')
    })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  })
  loginGoogle.addEventListener('click', () => {
    // Using a popup.
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      window.location.assign('main.html')
    });
  });
  loginFacebook.addEventListener('click', () => {
    // Sign in using a popup.
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Facebook Access Token.
      var token = result.provider.accessToken;
      // The signed-in user info.
      var user = result.user;
      window.location.assign('main.html')
    });
  });
  loginTwitter.addEventListener('click', () => {
    // Using a popup.
    var provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
      // For accessing the Twitter API.
      var token = result.provider.accessToken;
      var secret = result.provider.secret;
      // The signed-in user info.
      var user = result.user;
      window.location.assign('main.html')
    });
  });

  forgotPassword.addEventListener('click', () => {

    // var actionCodeSettings = {
    //   url: 'https://www.example.com/?email=user@example.com',
    //     handleCodeInApp: true
    // };
    firebase.auth().sendPasswordResetEmail(
      getEmail.value)
      .then(function () {
        firebase.auth.EmailAuthProvider.credential(getEmail.value, getPassword.value);
        alert("Password Reset Email Sent")
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/invalid-email') {
          alert('The email in invalid');
        } else if (errorCode == 'auth/user-not-found') {
          alert('The email is not exists');
        }
        console.log(error);
      });
  })

  /*  // [ Validate ]
   var input = $('.validate-input .input100');
 
   $('.validate-form').on('submit', function () {
     var check = true;
 
     for (var i = 0; i < input.length; i++) {
       if (validate(input[i]) == false) {
         showValidate(input[i]);
         check = false;
       }
     }
 
     return check;
   });
 
 
   $('.validate-form .input100').each(function () {
     $(this).focus(function () {
       hideValidate(this);
     });
   });
 
   function validate(input) {
     if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
       if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
         return false;
       }
     }
     else {
       if ($(input).val().trim() == '') {
         return false;
       }
     }
   }
 
   function showValidate(input) {
     var thisAlert = $(input).parent();
 
     $(thisAlert).addClass('alert-validate');
   }
 
   function hideValidate(input) {
     var thisAlert = $(input).parent();
 
     $(thisAlert).removeClass('alert-validate');
   } */



})(jQuery);