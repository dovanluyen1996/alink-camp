<template>
  <v-ons-page>
    <custom-toolbar title="初回案内" />
    <div class="content">
      <v-ons-carousel
        :index.sync="carouselIndex"
        fullscreen
        auto-scroll
        overscrollable
      >
        <v-ons-carousel-item>
          <v-ons-card>
            初回案内1
          </v-ons-card>
        </v-ons-carousel-item>

        <v-ons-carousel-item>
          <v-ons-card>
            初回案内2
          </v-ons-card>
        </v-ons-carousel-item>

        <v-ons-carousel-item>
          <v-ons-card>
            初回案内3
          </v-ons-card>
        </v-ons-carousel-item>

        <v-ons-carousel-item>
          <v-ons-card>
            初回案内4
          </v-ons-card>
        </v-ons-carousel-item>
      </v-ons-carousel>
    </div>

    <fixed-footer>
      <v-ons-button @click="clickNext">
        次へ
      </v-ons-button>
    </fixed-footer>
  </v-ons-page>
</template>

<script>
// components
import FixedFooter from '@/components/organisms/fixed-footer';

export default {
  name: 'FIrstGuidance',
  components: {
    FixedFooter,
  },
  data() {
    return {
      carouselIndex: 0,
    };
  },
  methods: {
    clickNext() {
      if (this.carouselIndex === 3) {
        console.log('goToUserNew');
      } else {
        this.carouselIndex += 1;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.call-to-purchase {
  height: auto;
}
</style>
