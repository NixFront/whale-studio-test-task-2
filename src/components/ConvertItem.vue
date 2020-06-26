<template>
  <div>
    <div class="convert-item blue darken-4">
      <form action="/">
        <span class="valute__name">{{currentValute}}</span>
        <input
          type="number"
          class="valute__value"
          v-model="currentValuteValue"
          @input="inputCurrentValute"
        />
        <span>=</span>
        <input
          type="number"
          class="valute__value"
          ref="valute"
          disabled
          :dataValute="valuteValue.toFixed(2)"
        />
        <span class="valute__name">{{code}}</span>
      </form>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      currentValuteValue: 1,
      baseCurrentValute: 1,
      valute: 0,
      baseValute: this.$props.valuteValue.toFixed(2)
    };
  },
  name: "convertItem",
  props: ["code", "valuteValue", "currentValute"],
  computed: mapGetters(["favoritesValutes"]),
  mounted() {
    this.$store.dispatch("fetchValutes");
    let current = this.currentValuteValue;
    current *= this.baseValute;
    this.$refs.valute.value = current.toFixed(2);
  },
  watch: {
    valuteValue(val) {
      let current = this.currentValuteValue;
      current *= val;
      this.$refs.valute.value = current.toFixed(2);
    }
  },
  methods: {
    inputCurrentValute() {
      let current = this.currentValuteValue;
      current *= this.baseValute;
      this.$refs.valute.value = current.toFixed(2);
    },
    calculate(val) {
      let current = this.currentValuteValue;
      current *= val;
      this.$refs.valute.value = current.toFixed(2);
    }
  }
};
</script>
<style lang="scss" scoped>
.valute__value {
  margin-bottom: 0px !important;
  margin: 0px 10px !important;
  width: 100%;
  max-width: 320px;
  display: block;
  text-align: center;
  color: #fff !important;
  &:placeholder {
    color: #fff !important;
  }
}
.convert-item {
  width: 100%;
  max-width: 400px;
  margin: 10px 0px;
  color: #fff;
  form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
  }
}
</style>