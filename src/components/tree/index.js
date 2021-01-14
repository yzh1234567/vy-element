import vyTree from "./src/tree.vue"

vyTree.install=function(Vue){
    Vue.component(vyTree.name,vyTree)
}

export default vyTree