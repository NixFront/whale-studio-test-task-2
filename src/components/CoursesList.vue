<template>
  <div>
    <div class="allCourses" v-if="favoritesValutes.length > 0">
      <h2>Favorites courses</h2>
      <div v-for="(valute, index) in favoritesValutes" :key="index" class="courses">
        <div v-if="valute.code != currentValute" class="block-wrapper blue darken-4 favorite">
          <div class="coures-left">
            <span>{{valute.code}}:</span>
            <span>{{valute.value.toFixed(2)}}</span>
          </div>
          <div class="coureses-right">
            <button type="button" @click="removeFavorite(valute.code)" class="button-addFavorite">
              <i class="material-icons">favorite</i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="allCourses">
      <h2>Courses</h2>
      <div v-for="(valute, index) in notFavoritesValutes" :key="index" class="courses">
        <div class="block-wrapper blue darken-4">
          <div class="coures-left">
            <span>{{index}}:</span>
            <span>{{valute.toFixed(2)}}</span>
          </div>
          <div class="coureses-right">
            <button type="button" @click="addFavorite(index)" class="button-addFavorite">
              <i class="material-icons">favorite_border</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  computed: mapGetters([
    "favoritesValutes",
    "notFavoritesValutes",
    "currentValute"
  ]),
  mounted() {
    this.$store.dispatch("fetchValutes");
  },
  methods: {
    addFavorite(valute) {
      this.$store.dispatch("addfavoritesValute", valute);
      this.favoritesValutes;
    },
    removeFavorite(valute) {
      this.$store.dispatch("removefavoritesValute", valute);
    }
  }
};
</script>
<style lang="scss" scoped>
.button-addFavorite {
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  opacity: 0;
  i {
    color: #c62828;
  }
}
.courses {
  .block-wrapper {
    width: 100%;
    max-width: 340px;
    color: #fff;
    padding: 10px;
    margin: 20px 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &:hover {
    button {
      opacity: 1;
    }
    button {
      i {
        transition: 0.3s ease-in-out;
      }
      &:hover {
        i {
          color: #ff5252;
        }
      }
    }
  }
  span:first-child {
    font-weight: bold;
  }
  span:last-child {
    padding-left: 20px;
  }
  &.favorite {
    button {
      opacity: 1;
      i {
        color: #ff5252;
      }
    }
  }
}
</style>