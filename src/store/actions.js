/**
 * Created by LangK on 2016/12/20.
 */
import Vue from 'vue'
require("../../API/config")
import home from "../assets/requerst/home"
export default {
    // 登录
    getLogin({}, postdata) {
        return Vue.http.post('/login', postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 添加博客
    getAdd({}, postdata) {
        return Vue.http.post('/comp/add', postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 添加博客标签云
    getTagAdd({}, postdata) {
        return Vue.http.post('/tag/add', postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 所有博客标签云列表
    getTagList({}, postdata) {
        return Vue.http.get('/tag/list', postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 所有博客列表
    getLists({}, postdata) {
        var pathStr = '/home/list?num=' + postdata.num + '&page=' + postdata.page
        return Vue.http.get(pathStr, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 查询博客详情
    getDetails({}, postdata) {
        return Vue.http.post('/home/find_details', postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 查询归档日期信息列表
    getFileLists({}, postdata) {
        return Vue.http.get('/home/find_details_files', postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 根据归档日期查询博客列表
    getFindTags({}, postdata) {
        return Vue.http.post('/home/find_tags', postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 根据标签云查询博客列表
    getFindArcs({}, postdata) {
        return Vue.http.post('/home/find_arc', postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 更新阅读次数
    getReadNum({}, postdata) {
        return Vue.http.post('/home/read', postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 访客次数
    getVisitNum({}, postdata) {
        return Vue.http.get('/home/visit', postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
}
