/* eslint-disable */


import blogAxios from './blogAxios'



export const baseUrl = blogAxios.defaults.baseURL;


/**获取所有文章信息 */
export const getBlogDatas = () => {
    return blogAxios.get('/api/XqArticle/GetXqArticles')
}

/**根据条件 分页查询博客数据 */
export const getBlogDataPage = (param: any) => {
    return blogAxios.get('/api/XqArticle/GetArticlePage', { params: param })
}

/**根据id获取文章信息 */
export const getBlogDataById = (id: any) => {
    return blogAxios.get('/api/XqArticle/GetXqArticleById', {
        params: {
            id: id
        }
    })
}
export const deleteBlog = (id: any) => {
    return blogAxios.delete('/api/XqArticle/DeleteById', {
        params: {
            id: id
        }
    })
}

/**添加博客信息 */
export const addBlogContent = (params: any) => {
    return blogAxios.post('/api/XqArticle/AddXqArticle', params)
}

/**更新博客信息 */
export const editBlogContent = (params: any) => {
    return blogAxios.put('/api/XqArticle/UpdateXqArticle', params)
}

/**获取所有标签信息 */
export const getTags = (params: any) => {
    return blogAxios.get('/api/XqTags/GetXqTagss', params)
}

/**上传文件 */
export const commitFile = (params: any) => {
    return blogAxios.post('/api/File/UploadFile', params, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}


export const loginBlog = (count: any, pwd: any) => {
    return blogAxios.get('/api/Login/Login', {
        params: {
            userCount: count,
            passWord: pwd
        }
    })
}
