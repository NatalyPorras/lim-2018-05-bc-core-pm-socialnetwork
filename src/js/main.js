<<<<<<< HEAD
document.querySelector('#log-out').addEventListener('click', (e) => {
  console.log('holaaaa')
  firebase.auth().signOut().then( function(){
    if (e.preventDefault) {
      window.location.assign('signin.html')
    }
  }).catch( function(error){

  });
})
=======
var mainApp = {};
(() => {
  var firebase = appFireBase;
  var uid = null; 
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      uid = user.uid;
    }else{
      uid = null;
      window.location.replace('login.html')
    }
  });
  var logOut = () => {
    firebase.auth().signOut();
  }
  mainApp.logOut = logOut;
})()
>>>>>>> b8f937af688ed3dd78c192e66e1026d807c940d0
