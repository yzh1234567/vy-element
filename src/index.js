import checkbox from "./components/checkbox/index.js";

import checkboxGroup from "./components/checkbox-group/index";

import icon from "./components/icon/index";

import tree from "./components/tree/index";

const components=[checkbox,checkboxGroup,icon,tree]

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
    checkboxGroup,
    icon,
    tree,
}