import checkbox from "./components/checkbox/index.js";

import checkboxGroup from "./components/checkbox-group/index";

const components=[checkbox,checkboxGroup]

function install(Vue){
    components.forEach(component=>{
        Vue.component(component.name,component)
    })
}

if(typeof window !=='undefined' && window.Vue){
    install(window.Vue)
}


export default{
    install,
    checkbox,
    checkboxGroup
}