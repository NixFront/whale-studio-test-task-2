<template>
  <nav>
    <div class="nav-wrapper blue darken-3">
      <router-link to="/" href="#" class="brand-logo">Whate task 2</router-link>
      <div class="currentValute center">
        <form>
          <span>Current valute:</span>
          <select ref="select" @change.prevent="changeCurrentValute">
            <option value disabled selected>Choose your valute</option>
            <option :value="currentValute" selected>{{currentValute}}</option>
            <option v-for="(valute, index) in allValutes" :key="index" :value="index">{{index}}</option>
          </select>
        </form>
      </div>
      <ul class="right hide-on-med-and-down">
        <router-link tag="li" to="/" exact active-class="active">
          <a href="/">convert</a>
        </router-link>
        <router-link tag="li" to="/courses" active-class="active">
          <a href="#">courses</a>
        </router-link>
      </ul>
    </div>
  </nav>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    select: "null"
  }),
  computed: mapGetters(["allValutes", "currentValute"]),
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
  },
  updated() {
    this.select = M.FormSelect.init(this.$refs.select);
  },
  methods: {
    changeCurrentValute() {
      const select = this.$refs.select.value;
      this.$store.dispatch("changeCurrentValute", select);
      this.$store.dispatch("fetchValutes");
    }
  },

  destroyed() {
    if (this.date && this.select.destroy) this.select.destroy();
  }
};
</script>
<style lang="scss" scoped>
.currentValute {
  width: 100%;
  max-width: 300px;
  margin: auto;
  form {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.nav-wrapper {
  padding: 0px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>