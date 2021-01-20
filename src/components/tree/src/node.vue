<template>
  <div class="vy-tree-ul">
    <!--tree的每一行-->
    <div class="vy-tree-li">
      <div class="vy-tree-item">
        <span class="vy-tree-expand" @click="handleExpand">
          <!--展开箭头组件-->
          <span :class="arrowType" v-if="showArrow"></span>
        </span>
        <!-- 加入自定义图标 -->
        <span
          :class="iconClass"
          v-if="iconClass ? true : false"
          class="vy-tree-expand"
        ></span>
        <vy-render v-if="data.render" :render="data.render"></vy-render>
        <!--  -->
        <vy-checkbox
          class="vy-checkbox"
          icon-size="18px"
          v-if="showCheckbox"
          :type="type"
          :value="data.checked"
          @change="handleSelect"
          :disabled="!!data.disabled"
        ></vy-checkbox>
        <span v-if="data.loading" class="vy-icon-loading"></span>
        <span @click="handleExpand">{{ data.label }}</span>
      </div>
      <!--node组件递归-->
      <Node
        v-show="data.expanded"
        :show-checkbox="showCheckbox"
        :mode="mode"
        :icon-class="iconClass"
        v-for="item in data.childNodes"
        :key="item.id"
        :data="item"
        @node-expand="handleNodeExpand"
      >
      </Node>
    </div>
  </div>
</template>
<script>
import broadCastMixins from "vy-element/src/mixins/emitter"; // 引入broadCast传值的方法
import vyCheckbox from "../../checkbox/index.js";
import vyRender from "../js/render";
export default {
  name: "Node", // 这个很关键，递归组件必须有name
  componentName: "Node",
  components: {
    vyCheckbox,
    vyRender,
  },
  data() {
    return {
      expanded: !!this.data.expanded,
      tree: null,
      //type: this.mode=='checkbox'?'square':'round',
    };
  },
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
    iconClass: {
      //自定义图标
      type: String,
    },
    defaultCheckedKeys: {
      // 默认多选勾选的节点的 key 的数组
      type: Array,
      default() {
        return [];
      },
    },
    showCheckbox: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: "checkbox",
      checkedValue: ["radio", "checkbox"],
    },
    load: {
      type: Function,
    },
  },
  watch: {
    "data.expanded"(val) {
      this.$nextTick(() => (this.expanded = val));
      // if (val) {
      //   this.childNodeRendered = true;
      // }
    },
    "data.checked"(val) {
      this.tree.$emit("check-change", this.data.data, val);
    },
  },
  mixins: [broadCastMixins],
  computed: {
    showArrow() {
      return (
        (this.data.childNodes && this.data.childNodes.length) ||
        (this.data.store.lazy && !this.data.loaded)
      );
    },
    arrowType() {
      //箭头方向,van组件提供的属性
      return this.showArrow && this.data.expanded
        ? "vy-icon-bottom"
        : "vy-icon-right";
    },
    type() {
      return this.mode == "checkbox" ? "square" : "round";
    },
  },
  methods: {
    handleNodeExpand(nodeData, node, instance) {
      this.broadcast("Node", "tree-node-expand", node);
      this.tree.$emit("node-expand", nodeData, node, instance);
    },
    handleExpand() {
      if (this.data.isLeaf) return;
      if (this.expanded) {
        this.tree.$emit("node-collapse", this.data.data, this.data, this);
        this.data.collapse();
      } else {
        this.data.expand();
        console.log(this.data);
        this.$emit("node-expand", this.data.data, this.data, this);
      }
    },
    /* 选择按钮 */
    handleSelect(value, ev) {
      let checkStrictly =
        this.mode === "radio" ? true : this.tree.checkStrictly;
      this.data.setChecked(ev.target.checked, !checkStrictly);
      this.tree.$emit("check", this.data);
    },
  },
  created() {
    const parent = this.$parent;
    console.log(parent);
    console.log(this.data);
    if (parent.isTree) {
      this.tree = parent;
    } else {
      this.tree = parent.tree;
    }
    if (this.tree.accordion) {
      this.$on("tree-node-expand", (node) => {
        if (this.data !== node) {
          this.data.collapse();
        }
      });
    }
  },
  mounted() {},
};
</script>

<style  lang='less'>
@import url("vy-element/src/less/index.less");
.vy-tree-ul,
.vy-tree-li {
  font-size: 20px;
  list-style: none;
  margin-left: 10px;
  position: relative;
  height: auto;
}
.vy-tree-ul {
  margin: 0 16px;
  box-sizing: border-box;
}
.vy-tree-item {
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  margin: 6px 3px;
  padding-right: 3px;
  padding-left: 10px;
  cursor: pointer;
}
.vy-tree-item:hover {
  background: @color1;
}
.vy-tree-item > span {
  padding: 0 6px;
}
.vy-tree-expand {
  height: 20px;
  cursor: pointer;
  line-height: 20px;
}
.vy-checkbox {
  display: inline-block !important;
  vertical-align: middle;
  margin-right: 4px;
}
.vy-tree-loading {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0;
  right: 0;
  margin: auto;
}
</style>


