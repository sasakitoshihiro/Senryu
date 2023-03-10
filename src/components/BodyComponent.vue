<template>
  <div>
    <form>
      <label for="senryu">川柳：</label>
      <input type="text" id='senryu' v-model="senryu">
      <label for="author">作者：</label>
      <input type="text" id='author' v-model="author">
      <button type="submit" @click.prevent="submitForm">投稿する</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      senryuId: '',
      senryu: '',
      author: '',
      jiamari: null,
      jifusoku: null,
      timestamp: '',
    };
  },
  methods: {
    submitForm() {
      this.$emit('form-submitted', {
        senryu: this.senryu,
        author: this.author,
        jiamari: this.isJiamari,
        jifusoku: this.isJifusoku,
        timestamp: new Date(),
      });
      this.senryu = '';
      this.author = '';
      this.jiamari = null;
      this.jifusoku = null;
    },
  },
  computed: {
    is17Digit() {
      return this.senryu.length === 17;
    },
    isJiamari() {
      return this.senryu.length > 17;
    },
    isJifusoku() {
      return this.senryu.length < 17;
    },
  },
};
</script>
