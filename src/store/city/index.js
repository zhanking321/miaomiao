const state = {
    name: localStorage.getItem("nowNm") ||'北京',
    cityId: localStorage.getItem("nowId")||110100
}
const actions = {}
const mutations = {
    CITY_INFO(state, payload){
        state.name = payload.name
        state.cityId = payload.cityId
    }
}
export default  {
    namespace: true,
    state,
    actions,
    mutations
}