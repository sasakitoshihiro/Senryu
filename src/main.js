import Vue from 'vue';
import firebase from 'firebase/app';
import App from './App.vue';
import 'firebase/firestore';

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: 'AIzaSyAK8cQQX2GFiFB6Lj74WERHapqNU8FjQoM',
  authDomain: 'senryu-dev.firebaseapp.com',
  projectId: 'senryu-dev',
  storageBucket: 'senryu-dev.appspot.com',
  messagingSenderId: '859469312062',
  appId: '1:859469312062:web:76c3b8ec8036102271216f',
};

firebase.initializeApp(firebaseConfig);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
