export default {
    namespaced: true,
    state: {
        enums: null
    },
    mutations: {
        setEnums: function (state, payload) {
            state.enums = { ...payload }
        }
    },
    getters: {
        getEnum: function (state) {
            return key => {
                let b = {};
                const keys = Object.keys(state.enums[key])
                for (const k in keys.slice(0, keys.length/2)) {
                    b[k] = state.enums[key][k];
                }
                return b;
            }
        }
    }
}