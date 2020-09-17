import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faChevronLeft, faPlus, faTimesCircle);

Vue.component('font-awesome-icon', FontAwesomeIcon);
