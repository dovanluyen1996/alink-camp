<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button />
      </div>
      <div class="center">
        {{ help.title }}
      </div>
    </v-ons-toolbar>
    <v-ons-card>
      <div>
        <div>
          <img :src="help.image.url">
        </div>
        <div>
          {{ help.description }}
        </div>
      </div>
    </v-ons-card>
  </v-ons-page>
</template>
