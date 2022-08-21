<template>
  <v-app>
    <nav-bar/>
    <v-carousel v-model="model" class="grey lighten-1">
      <v-carousel-item  >
        <v-sheet
          height="100%"
          tile
          class="grey lighten-1"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="text-h2">
              A pagina Aluguel está em manutenção !
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item  >
      <v-sheet
        height="100%"
        tile
        class="grey lighten-1"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="text-h2">
            Wda Livraria
          </div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>

  </v-app>
</template>

<script>
  import NavBar from "../components/NavBar.vue"

  export default {
    name: 'Manutenção',

    components: {
      NavBar,
    },
  }
</script>