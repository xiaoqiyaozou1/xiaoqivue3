import axios from 'axios'
import { ElMessage } from 'element-plus'
const blogAxios = axios;
blogAxios.defaults.baseURL = 'http://www.xiaoqiyaozou.cn:5002'
//blogAxios.defaults.baseURL = 'http://localhost:5000/'
blogAxios.interceptors.request.use(config => {

    //config.headers.Authorization = token
    config.headers.Authorization = window.sessionStorage.getItem('blogToken')
    return config
})


blogAxios.interceptors.response.use(res => {
    return res
}, error => {
    let msg = "";
    if (error == 404) {
        ElMessage({
            message: msg,
            type: 'error',
        })

    }
    if (error.response.status === 401) {
        msg = "未登录请登录"
        ElMessage({
            message: msg,
            type: 'error',
        })

    }
    if (error.response.status === 403) {
        msg = "无权限"
        ElMessage({
            message: msg,
            type: 'error',
        })
    }

    // alert(error.response.status)
    return Promise.reject(error.response.status)
}
)
export default blogAxios

