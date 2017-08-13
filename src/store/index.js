import Vue from 'vue'
import Vuex from 'vuex'

let local = {
    SET_STATE: 'SET_STATE',
    STORAGE_NAME: 'caged-settings',
    STORAGE_ENV: () => {
        if (typeof window.chrome !== 'undefined' &&
            window.chrome.hasOwnProperty('storage') &&
            window.chrome.storage.hasOwnProperty('sync')
        ) {
            return build
        } else {
            return develop
        }
    }
}

const develop = {
    get: (callback) => {
        callback(JSON.parse(localStorage.getItem(local.STORAGE_NAME)))
    },
    set: (payload) => {
        return new Promise((resolve, reject) => {
            localStorage.setItem(local.STORAGE_NAME, JSON.stringify(payload))
            resolve(true)
        })
    }
}

const build = {
    get: (callback) => {
        window.chrome.storage.sync.get(local.STORAGE_NAME, (results) => {
            callback(results[local.STORAGE_NAME])
        })
    },
    set: (payload) => {
        return new Promise((resolve, reject) => {
            let data = {}
            data[local.STORAGE_NAME] = payload
            window.chrome.storage.sync.set(data)
            resolve(true)
        })
    }
}

let api = {
    get () {
        return new Promise((resolve, reject) => {
            let storageEnv = local.STORAGE_ENV()
            storageEnv.get(results => {
                if (results === 'undefined' || results === undefined || results === null) {
                    let settings = state.options.reduce((result, option) => {
                        result.push({
                            name: option.name,
                            checked: option.checked,
                            url: option.url,
                            method: option.method
                        })
                        return result
                    }, [])
                    storageEnv.set(settings)
                }
                resolve(true)
            })
        })
    },
    update (payload) {
        let storageEnv = local.STORAGE_ENV()
        storageEnv.get(settings => {
            settings[payload.index].checked = payload.value
            storageEnv.set(settings)
            return true
        })
    }
}

const state = {
    options: [
        {
            name: 'cage',
            title: 'Nick Cage',
            url: 'http://placecage.com/',
            method: '/',
            checked: 'checked'
        },
        {
            name: 'giphyCage',
            title: 'Giphy Cage',
            url: 'http://placecage.com/gif/',
            method: '/',
            checked: 'checked'
        },
        {
            name: 'crazyCage',
            title: 'Crazy Nick Cage',
            url: 'http://placecage.com/c/',
            method: '/',
            checked: 'checked'
        },
        {
            name: 'hoff',
            title: 'The Hoff',
            url: 'http://place-hoff.com/',
            method: '/',
            checked: 'checked'
        },
        {
            name: 'segal',
            title: 'Steven Segal',
            url: 'http://stevensegallery.com/',
            method: '/',
            checked: 'checked'
        },
        {
            name: 'murray',
            title: 'Bill Murray',
            url: 'http://fillmurray.com/',
            method: '/',
            checked: 'checked'
        }
    ]
}

const getters = {
    options: state => state.options,
    byName: state => name => {
        return state.options.findIndex(option => {
            return option.name === name
        })
    }
}

const actions = {
    getSettings: ({ commit }) => {
        api.get().then(() => {
            local.STORAGE_ENV().get(settings => {
                settings.forEach((setting) => {
                    state.options.find((option, index) => {
                        if (option.name === setting.name) {
                            commit(local.SET_STATE, {
                                index: index,
                                value: setting.checked
                            })
                        }
                    })
                })
            })
        })
    },
    updateSettings: ({ commit, getters }, payload) => {
        let index = getters.byName(payload.name)
        let values = {
            index: index,
            value: payload.value
        }
        return new Promise((resolve, reject) => {
            commit(local.SET_STATE, values)
            api.update(values)
            resolve(true)
        })
    }
}

const mutations = {
    [local.SET_STATE] (state, payload) {
        state.options[payload.index].checked = payload.value
    }
}

Vue.use(Vuex)

export default new Vuex.Store({
    local,
    state,
    getters,
    actions,
    mutations
})
