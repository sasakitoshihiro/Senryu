<template>
  <div>
    <header-component />
    <body-component @form-submitted="onFormSubmitted"></body-component>
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
    };
  },
  created() {
    this.loadSenryuData();
  },
  methods: {
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
      // this.loadSenryuData();
      this.isFormSubmitted = true;
      this.submittedData = data;
    },
  },
};
</script>

<style>
</style>
