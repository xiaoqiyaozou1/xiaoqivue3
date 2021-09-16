import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { getBlogDataPage } from '../api/index'
export interface State {
    blogList: any;
}

export const key: InjectionKey<Store<State>> = Symbol()
export const store = createStore<State>({
    state: {
        blogList: null
    },
    mutations: {
        updateBlogList(state, data) {
            state.blogList = data
        }
    },
    actions: {
        async updateBlogList({ commit }, querys) {
            commit('updateBlogList', await getBlogDataPage(querys))
        }
    }
})

export function useStore() {
    const store = baseUseStore(key);
    return store;
}