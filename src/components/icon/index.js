import icon from "./src/vy-icon.vue"

icon.install=function(Vue){
    Vue.component(icon.name,icon)
}

export default icon