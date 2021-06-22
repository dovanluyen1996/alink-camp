import Vue from 'vue';
import Cognito from '@/cognito/cognito';
import config from '@/config/cognito';

Vue.use(Cognito, config);

export default new Cognito();
