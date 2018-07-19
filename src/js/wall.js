document.querySelector('#log-out').addEventListener('click', (e) => {
  firebase.auth().signOut().then(function () {
    if (e.preventDefault) {
      window.location.assign('index.html')
    }
  }).catch(function (error) {

  });
})

// Desarrollo de La publicacion de Post

const buttonPublish = document.querySelector('#buttonPublish')
const postEntrada = document.querySelector('#exampleTextarea');
const dataBase = document.querySelector('#create-post');
const posts = document.querySelector('#posts');
const profile = document.getElementById('profile');
const writingPost = document.querySelector('#publicPost');

let count_click = 0;

function reload_page() {
  window.location.reload();
};

buttonPublish.addEventListener('click', () => {
  if (postEntrada.value !== '') {
    const userId = firebase.auth().currentUser.uid;
    const userName = firebase.auth().currentUser.displayName;

    // writeNewPost(userId, postEntrada.value);
    writeNewPost(userId, postEntrada.value, count_click, userName);
    postEntrada.value = '';
    reload_page();
    // paintNewPost(userId, newPost);
  } else {
    alert('Ingresar texto a publicar')
  }


});
firebase.auth().onAuthStateChanged(function (user) {
  if (firebase.auth().currentUser.isAnonymous === true) {

    if (user) {
      const dbRefPost = firebase.database().ref().child('posts');

      dbRefPost.once('value', postKey => {
        paintPost(postKey);
        // console.log(postKey);
        // document.querySelector('data-postid').style.display = 'none';
        // $('.post-icon').addClass('unshow');
      })
    }
  } else {
    document.querySelector('.create-post').style.display = 'block';
    document.querySelector('.profile-card').style.display = 'block';
    if (user) {
      profile.innerHTML = `<img src="${user.photoURL}" alt="user" class="profile-photo" />
                              <h5>
                                <a href="timeline.html" id="name"class="text-white">${user.displayName}</a>
                              </h5>'
                              <a href="#" class="text-white"><i class="ion ion-android-person-add"></i> 1,299 followers</a>
                            `;
      // writingPost.innerHTML = `<img src="${user.photoURL}" alt="" class="profile-photo-md" />
      //                         `;
      let imgProfile = document.querySelector('#img-profile');
      imgProfile.setAttribute(src, user.photoURL);
      let userId = firebase.auth().currentUser.uid;
      const dbRefPost = firebase.database().ref().child('user-posts').child(userId);

      dbRefPost.on('value', postKey => {
        paintPost(postKey);
        const displayIcon = document.querySelectorAll('.contenidoPost .post-icon');
        displayIcon.style.display = 'inline-block';

        // console.log(document.querySelectorAll('.btn-delete'))
        const buttonsDelete = document.querySelectorAll('.btn-delete');
        buttonsDelete.forEach(button => {
          button.addEventListener('click', () => {
            const postId = button.getAttribute('data-postId')
            dbRefPost.child(postId).remove();
            firebase.database().ref().child('posts').child(postId).remove();

            //   while(posts.firstChild) posts.removeChild(posts.firstChild);

            alert('The user is deleted successfully!');
            dbRefPost.on('value', postKey => {
              paintPost(postKey)
              document.querySelector('.post-icon').style.display = 'block';

            })
            reload_page();
          });
        })

      })
    }
  }
})

const paintPost = (postKey) => {
  postKey.forEach(keys => {
    let postId = keys.key;
    let user = keys.userName;
    createPost(postId, keys, user);

    let aux = 0;
    const buttonsUpdate = document.querySelectorAll('.btn-update');
    buttonsUpdate.forEach(button => {
      console.log(button);
      button.addEventListener('click', () => {
        const postId = button.getAttribute('dataU-postId')
        if (aux === 0) {
          document.getElementById(postId).disabled = false;
          aux = 1;
        } else {
          document.getElementById(postId).disabled = true;
          aux = 0;
        }
        const newUpdate = document.getElementById(postId);
        const nuevoPost = {
          body: newUpdate.value,
          countLike: count_click,
        };

        const updatesUser = {};
        const updatesPost = {};

        updatesUser['/user-posts/' + userId + '/' + postId] = nuevoPost;
        updatesPost['/posts/' + postId] = nuevoPost;
        firebase.database().ref().update(updatesUser);
        firebase.database().ref().update(updatesPost);



      })

    })

    const buttonsLike = document.querySelectorAll('.btn-like');
    buttonsLike.forEach(button => {
      button.addEventListener('click', () => {
        const postId = button.getAttribute('dataL-postId')
        count_click += 1;
        document.getElementById('countLikes').innerHTML = "A " + count_click + " le gustan este post";


        const updatesUser = {};
        const updatesPost = {};

        updatesUser['/user-posts/' + userId + '/' + postId + '/' + countlike] = count_click;
        updatesPost['/posts/' + postId] = nuevoPost;
        firebase.database().ref().update(updatesUser);
        firebase.database().ref().update(updatesPost);

      });
    })

  })
}

const createPost = (postId, keys, user) => {

  posts.innerHTML += `<div>
      <div>
        <h5>
          <a href="timeline.html" id="name"class="text-white">${user}</a>
        </h5>
      </div>
      <textarea class="form-control caja" id="${postId}" disabled>${keys.val().body}</textarea>
      <i  dataU-postId="${postId}" class="far fa-edit post-icon btn-update"></i>
      <i  data-postId="${postId}" class="far fa-trash-alt post-icon btn-delete"></i>
      <i  dataL-postId="${postId}" class="far fa-heart post-icon btn-like"></i>
      <span id="countLikes">${keys.val().countLike}</span>
      </div>
    `

}