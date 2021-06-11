<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button />
      </div>
      <div class="center">
        {{ notice.title }}
      </div>
    </v-ons-toolbar>
    <v-ons-card>
      <div>
        <div>
          <img :src="notice.image">
        </div>
        <div>
          {{ notice.startedAt }}
        </div>
        <div>
          {{ notice.description }}
        </div>
      </div>
    </v-ons-card>
  </v-ons-page>
</template>
