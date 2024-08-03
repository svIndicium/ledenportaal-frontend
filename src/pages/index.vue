<template>
  <v-container class="fill-height">
    <v-responsive class="align-center fill-height">
      <div class="text-center mb-8">
        <h1 class="text-h2 font-weight-bold">Indicium Portaal</h1>
        <p class="text-body-1 mt-2">Maak een keuze:</p>
      </div>

      <v-row justify="center" align="center" class="mb-8 button-container">
        <v-col cols="12" md="5" class="text-center d-flex justify-center">
          <v-btn
            color="primary"
            variant="elevated"
            rounded
            :to="{ path: '/login' }"
            height="75"
            class="text-h5 fixed-width-button"
          >
            Leden
          </v-btn>
        </v-col>
        <v-col cols="12" md="5" class="text-center d-flex justify-center">
          <v-btn
            color="secondary"
            variant="elevated"
            rounded
            :to="{ path: '/placeholder' }"
            height="75"
            class="text-h5 fixed-width-button"
          >
            Niet-leden
          </v-btn>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <v-btn
            color="teal-darken-3"
            variant="outlined"
            rounded
            href="https://svindicium.nl/lid-worden"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lid worden
          </v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
// No additional script needed for this component
</script>

<style scoped>
.button-container {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.fixed-width-button {
  width: 200px;
  max-width: 100%;
}

@media (max-width: 960px) {
  .button-container > .v-col {
    margin-bottom: 16px;
  }
}
</style>
