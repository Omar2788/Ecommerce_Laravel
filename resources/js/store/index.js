import { createStore } from 'vuex'
import Articlestore from './modules/articleFeature'
import createPersistedState from 'vuex-persistedstate';

export default createStore({
    modules: {
      Articlestore
    },
    plugins: [createPersistedState()],
})
