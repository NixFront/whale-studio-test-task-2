<template>
  <div>
    <div class="convert" v-if="favoritesValutesCode.length > 0">
      <ConvertItem
        v-for="(valute,index) in favoritesValutesCode"
        :key="index"
        :valuteValue="valute.value"
        :code="valute.code"
        :currentValute="currentValute"
      />
    </div>
    <p class="error" v-else>
      No favorite valute to convert, add favorite valute on page
      <router-link to="/courses">
        <a href="#">"courses"</a>
      </router-link>
    </p>
  </div>
</template>

<script>
import ConvertItem from "../components/ConvertItem.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "convertValute",
  data() {
    return {
      favoritesValutesCode: []
    };
  },
  components: {
    ConvertItem
  },
  computed: {
    ...mapGetters(["favoritesValutes", "currentValute"])
  },
  watch: {
    favoritesValutes(val) {
      this.favoritesValutesCode = val;
    }
  },
  mounted() {
    this.$store.dispatch("fetchValutes");
  }
};
</script>
<style lang="scss" scoped>
.error {
  font-size: 24px;
  margin-top: 40px;
}
</style>