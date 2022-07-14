<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="">StudieWeb</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" href="">Contact</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="">Pricing</a>
          </li>
          <span class="navbar-text">{{ this.$t("language") }}: &nbsp;</span>
          <form class="form-inline">

            <select v-model="$i18n.locale" class="form-control">
              <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
            </select>

          </form>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  methods: {

  }
}

</script>

<style scoped>

</style>