import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { getBlogDataPage } from '../api/index'

/**
 * 博客列表
 */
export interface BlogList {
    id: string;
    title: string;
    createTime: string;
    tag: string;
}

export interface BlogData {
    blogList: BlogList[];
    total: number;
}


export interface GlobalDataProps {
    blogData: BlogData;
}

export const key: InjectionKey<Store<GlobalDataProps>> = Symbol()
export const store = createStore<GlobalDataProps>({
    state: {
        blogData: {
            blogList: [],
            total: 0
        }
    },
    mutations: {
        updateBlogList(state, data) {
            state.blogData.blogList = data.data;
            state.blogData.total = data.total;
        }
    },
    actions: {
        async updateBlogList({ commit }, querys) {
            const { data } = await getBlogDataPage(querys)
            commit('updateBlogList', data.response)
        }
    }
})

export function useStore() {
    const store = baseUseStore(key);
    return store;
}