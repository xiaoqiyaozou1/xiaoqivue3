import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { getBlogDataPage, getTags } from '../api/index'

/**
 * 博客列表
 */
export interface BlogList {
    id: string;
    title: string;
    createTime: string;
    tag: string;
}

/**
 * 博客数据 博客列表以及博客数量
 */
export interface BlogData {
    blogList: BlogList[];
    total: number;
}
export interface BlogTag {
    id: string;
    name: string;
}
export interface BlogTagList {
    blogTagList: BlogTag[];
}

export interface GlobalDataProps {
    blogData: BlogData;
    blogTagData: BlogTagList;
}

export const key: InjectionKey<Store<GlobalDataProps>> = Symbol()
export const store = createStore<GlobalDataProps>({
    state: {
        blogData: {
            blogList: [],
            total: 0
        },
        blogTagData: {
            blogTagList: []
        }
    },
    mutations: {
        updateBlogList(state, data) {
            state.blogData.blogList = data.data;
            state.blogData.total = data.total;
        },
        updateBlogTagList(state, data) {
            state.blogTagData.blogTagList = data;
        }
    },
    actions: {
        async updateBlogList({ commit }, querys) {
            const { data } = await getBlogDataPage(querys)
            commit('updateBlogList', data.response)
        },
        async updateBlogTagList({ commit }, querys) {
            const { data } = await getTags(querys)
            commit('updateBlogTagList', data.response)
        }
    }
})

export function useStore() {
    const store = baseUseStore(key);
    return store;
}