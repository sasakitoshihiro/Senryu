<template>
  <div>
    <span v-if="user && user.isGoogleLogin">{{ user.displayName }}さん</span><br />
    <button v-if="!user" @click="loginAnonymously">匿名ログイン</button>
    <button v-if="!user" @click="loginWithGoogle">Googleログイン</button>
    <button v-if="user" @click="logout">ログアウト</button>
    <hr>
    <header-component />
    <body-component v-if="!user" @form-submitted="onFormSubmitted"></body-component>
    <footer-component />
    <hr>
    <div v-if="isFormSubmitted">
      川柳: {{ submittedData.senryu }}<br />
      作者: {{ submittedData.author }}<br />
      字余り: {{ submittedData.jiamari }}<br />
      字不足: {{ submittedData.jifusoku }}<br />
      {{ submittedData.timestamp }}
    </div>
    <br />
    <div>
      <ul>
        <li v-for="(data, index) in senryuData" :key="index">
          川柳: {{ data.senryu }}, 作者: {{ data.author }}, 字余り：{{ data.jiamari }},
          字不足：{{ data.jifusoku }}, {{ data.timestamp }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import HeaderComponent from './components/HeaderComponent.vue';
import BodyComponent from './components/BodyComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

export default {
  components: {
    HeaderComponent,
    BodyComponent,
    FooterComponent,
  },
  data() {
    return {
      senryuData: [],
      isFormSubmitted: false,
      submittedData: null,
      user: null,
    };
  },
  created() {
    // this.loginAnonymously();
    this.loadSenryuData();
  },
  methods: {
    loginAnonymously() {
      firebase.auth().signInAnonymously()
        .then((userCredential) => {
          console.log('User signed in anonymously:', userCredential.user.uid);
          this.user = userCredential.user;
        })
        .catch((error) => {
          console.error('Error signing in anonymously:', error);
        });
    },
    loginWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          console.log('User signed in with Google:', result.user.uid);
          this.user = {
            ...result.user,
            isGoogleLogin: true,
          };
          this.user.displayName = result.user.displayName;
          console.log(this.user.displayName);
        })
        .catch((error) => {
          console.error('Error signing in with Google:', error);
        });
    },
    logout() {
      firebase.auth().signOut()
        .then(() => {
          console.log('User signed out');
          this.user = null;
        })
        .catch((error) => {
          console.error('Error signed out', error);
        });
    },
    loadSenryuData() {
      firebase
        .firestore()
        .collection('keys')
        .onSnapshot((snapshot) => {
          this.senryuData = [];
          snapshot.forEach((doc) => {
            console.log(doc.data().timestamp);
            doc.data().timestamp.toDate();
            this.senryuData.push(doc.data());
          });
        });
    },
    onFormSubmitted(data) {
      firebase
        .firestore()
        .collection('keys')
        .add(data);
      this.loadSenryuData();
      this.isFormSubmitted = true;
      this.submittedData = data;
    },
  },
};
</script>

<style>
</style>
