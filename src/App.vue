<template>
  <div id="app">
    <Header />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>
<script>
import Header from "@/components/header";
export default {
  components: {
    Header
  }
};
</script>
<style lang="scss">
.select-wrapper input.select-dropdown {
  color: #fff;
}
.dropdown-content {
  max-height: 150px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}
@import "~materialize-css/dist/css/materialize.min.css";
</style>
