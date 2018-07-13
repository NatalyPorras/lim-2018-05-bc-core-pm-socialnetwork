window.createUser = (email, password, repeatPassword) => {
  if (password === repeatPassword) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        window.location.assign('index.html')
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
  } else {
    console.log('Your password doesnt mach');
    alert('Your password doesnt mach');
  }
<<<<<<< HEAD
<<<<<<< HEAD
};
=======
}
>>>>>>> fb7e98aa371cadac756c2890cad4dac6690f3d41
=======
};
>>>>>>> c8249bafa0db07f1320fb9bb6847c23880cf1dc8

window.signInUser = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
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
<<<<<<< HEAD
<<<<<<< HEAD
};
=======
}
>>>>>>> fb7e98aa371cadac756c2890cad4dac6690f3d41
=======
};
>>>>>>> c8249bafa0db07f1320fb9bb6847c23880cf1dc8

window.resetPassword = (email, password) => {
  firebase.auth().sendPasswordResetEmail(
    getEmail.value)
    .then(function () {
      firebase.auth.EmailAuthProvider.credential(email, password);
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
<<<<<<< HEAD
<<<<<<< HEAD
};
=======
}
>>>>>>> fb7e98aa371cadac756c2890cad4dac6690f3d41
=======
};
>>>>>>> c8249bafa0db07f1320fb9bb6847c23880cf1dc8

window.loginWithGoogle = () => {
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
<<<<<<< HEAD
<<<<<<< HEAD
};
=======
}
>>>>>>> fb7e98aa371cadac756c2890cad4dac6690f3d41
=======
};
>>>>>>> c8249bafa0db07f1320fb9bb6847c23880cf1dc8

window.loginWithFacebook = () => {
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
<<<<<<< HEAD
<<<<<<< HEAD
};
=======
}
>>>>>>> fb7e98aa371cadac756c2890cad4dac6690f3d41
=======
};
>>>>>>> c8249bafa0db07f1320fb9bb6847c23880cf1dc8

window.loginWithTwitter = () => {
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c8249bafa0db07f1320fb9bb6847c23880cf1dc8
};

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
})(jQuery);
<<<<<<< HEAD
=======
}
>>>>>>> fb7e98aa371cadac756c2890cad4dac6690f3d41
=======
>>>>>>> c8249bafa0db07f1320fb9bb6847c23880cf1dc8
