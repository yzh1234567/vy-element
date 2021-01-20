<template>
  <div class="vy-tree">
    <div class="vy-tree-node" v-for="item in root.childNodes" :key="item.id">
      <Node
        :data="item"
        :icon-class="iconClass"
        :mode="mode"
        :show-checkbox="showCheckbox"
        @node-expand="handleNodeExpand"
      ></Node>
    </div>
  </div>
</template>

<script>
import Store from "../js/store";
import broadCastMixins from "vy-element/src/mixins/emitter"; // 引入broadCast传值的方法
import Node from "./node.vue";
export default {
  name: "vyTree",
  componentName: "vyTree",
  components: {
    Node,
  },
  mixins: [broadCastMixins],
  props: {
    data: {
      type: Array,
    },
    iconClass: {
      type: String,
    },
    emptyText: {
      type: String,
      // default() {
      //   return t('el.tree.emptyText');
      // }
    },
    renderAfterExpand: {
      type: Boolean,
      default: true,
    },
    nodeKey: String,
    checkStrictly: Boolean,
    defaultExpandAll: Boolean,
    expandOnClickNode: {
      type: Boolean,
      default: true,
    },
    checkOnClickNode: Boolean,
    checkDescendants: {
      type: Boolean,
      default: false,
    },
    autoExpandParent: {
      type: Boolean,
      default: true,
    },
    defaultCheckedKeys: Array,
    defaultExpandedKeys: Array,
    currentNodeKey: [String, Number],
    renderContent: Function,
    showCheckbox: {
      type: Boolean,
      default: false,
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    allowDrag: Function,
    allowDrop: Function,
    props: {
      default() {
        return {
          children: "children",
          label: "label",
          disabled: "disabled",
        };
      },
    },
    lazy: {
      type: Boolean,
      default: false,
    },
    highlightCurrent: Boolean,
    load: Function,
    filterNodeMethod: Function,
    accordion: Boolean,
    indent: {
      type: Number,
      default: 18,
    },
    iconClass: String,
    defaultRadioKey: {
      // 默认单选勾选的节点的 key 的字符串
      type: String,
      default: "",
    },
    mode: {
      // 配置项，是否显示checkbox
      type: String,
      default: "checkbox",
      checkedValue: ["radio", "checkbox"],
    },
    render: {
      type: Function,
    },
  },
  data() {
    return {
      store: null,
      root: null,
      flatTreeMap: {}, //存放树形数组拍平后生成的对象
    };
  },
  watch: {
    data(newVal) {
      this.store.setData(newVal);
    },
  },
  // 先定义几个方法，这些方法最终要执行的是把Node组件传过来的数据抛到调用Tree的组件里面
  methods: {
    handleNodeExpand(nodeData, node, instance) {
      this.broadcast("Node", "tree-node-expand", node);
      this.$emit("node-expand", nodeData, node, instance);
    },
  },
  // 在组件created的时候，定义接收方法，this.broadCast方法传过来的值在这里进行接收
  created() {
    this.isTree = true;
    this.store = new Store({
      key: this.nodeKey,
      data: this.data,
      lazy: this.lazy,
      props: this.props,
      load: this.load,
      currentNodeKey: this.currentNodeKey,
      checkStrictly: this.checkStrictly || this.mode == "radio",
      checkDescendants: this.checkDescendants,
      defaultCheckedKeys: this.defaultCheckedKeys,
      defaultExpandedKeys: this.defaultExpandedKeys,
      autoExpandParent: this.autoExpandParent,
      defaultExpandAll: this.defaultExpandAll,
      filterNodeMethod: this.filterNodeMethod,
      mode: this.mode,
      render: this.render,
      accordion: this.accordion,
    });
    this.root = this.store.root;
    console.log(this.root);
  },
};
</script>

<style>
.vy-tree-node {
  font-size: 30px;
  width: 90%;
  margin: 0 auto;
}
</style>
