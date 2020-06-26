import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        valutes: [],
        currentValute: JSON.parse(localStorage.getItem('currentValute') || '"USD"'),
        favoritesValuteCode: JSON.parse(localStorage.getItem('favoritesValuteCode') || '[]'),
    },
    mutations: {
        updateValutes(state, valutes) {
            let valutesArr = Object.entries(valutes)
            valutesArr.forEach((v, index) => {
                if (v[0] == state.currentValute) valutesArr.splice(index, 1)
            })
            const valutesObj = Object.fromEntries(valutesArr)
            state.valutes = valutesObj
        },
        updateCurrentValute(state, currentValute) {
            state.currentValute = currentValute
            localStorage.setItem('currentValute', JSON.stringify(state.currentValute));
        },
        addfavoritesValute(state, valute) {
            let count = 0;
            state.favoritesValuteCode.map(v => {
                if (v == valute)
                    count++
            })
            if (count == 0) state.favoritesValuteCode.push(valute)
            localStorage.setItem('favoritesValuteCode', JSON.stringify(state.favoritesValuteCode));
        },
        removefavoritesValute(state, valute) {
            state.favoritesValuteCode.map((v, index) => {
                if (v == valute) {
                    state.favoritesValuteCode.splice(index, 1)
                }
            })
            localStorage.setItem('favoritesValuteCode', JSON.stringify(state.favoritesValuteCode));
        }

    },
    actions: {
        async fetchValutes(ctx) {
            const res = await fetch("https://api.exchangeratesapi.io/latest?base=" + this.state.currentValute)
            const valutes = await res.json()

            ctx.commit('updateValutes', valutes.rates)
        },
        changeCurrentValute(ctx, currentValute) {
            ctx.commit("updateCurrentValute", currentValute)
        },
        addfavoritesValute(ctx, valute) {
            ctx.commit("addfavoritesValute", valute)
        },
        removefavoritesValute(ctx, valute) {
            ctx.commit("removefavoritesValute", valute)
        }

    },
    getters: {
        allValutes(state) {
            return state.valutes
        },
        currentValute(state) {
            return state.currentValute
        },
        notFavoritesValutes(state) {
            let valutesArr = Object.entries(state.valutes)
            state.favoritesValuteCode.forEach((fv, fvIndex) => {
                valutesArr.forEach((v, index) => {
                    if (fv == v[0]) {
                        valutesArr.splice(index, 1)
                    }
                })
            })
            return Object.fromEntries(valutesArr)
        },
        favoritesValutes(state) {
            let favoritesValutes = []
            state.favoritesValuteCode.forEach((fv, index) => {
                const code = fv,
                    value = state.valutes[`${fv}`],
                    valuteObj = {
                        code,
                        value
                    }
                if (value)
                    favoritesValutes.push(valuteObj)
            })
            return favoritesValutes
        },

    }
})