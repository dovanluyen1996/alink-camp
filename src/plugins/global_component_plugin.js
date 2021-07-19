// 独自で作成したコンポーネント等の読み込み
import Vue from 'vue';

// components
import CustomToolbar from '@/components/organisms/custom-toolbar.vue';
import Loading from '@/components/organisms/loading.vue';

// style
import '@/assets/scss/style.scss';

Vue.component('CustomToolbar', CustomToolbar);
Vue.component('Loading', Loading);
