<template>
  <div>
    <label
      class="my-checkbox"
      :class="{
        'is-disabled': disabled,
        'is-checked': isChecked,
        'is-focus': focus,
      }"
    >
      <span
        class="my-checkbox__input"
        :class="{ 'is-disabled': disabled, 'is-checked': isChecked }"
      >
        <span class="my-checkbox__inner" :style="styleObject"></span>
        <input
          type="checkbox"
          class="my-checkbox__original"
          :value="label"
          v-model="model"
          :disabled="disabled"
          @focus="focus = true"
          @blur="focus = false"
          @change="handleChange"
        />
      </span>
      <span class="my-checkbox__label" v-if="$slots.default || label">
        <slot></slot>
        <!-- // 有插槽内容显示插槽 无直接显示label -->
        <template v-if="!$slots.default">{{ label }}</template>
      </span>
    </label>
  </div>
</template>
<script>
import emitter from "vy-element/src/mixins/emitter";
export default {
  name: "vyCheckbox",
  componentName: "vyCheckbox",
  mixins: [emitter],
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    label: {},
    type: {
      type: String,
      default: "square",
      descrition: "可选值 ‘round’/‘square’",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number, Boolean],
    },
  },
  data() {
    return {
      styleObject: {
        "border-radius": this.type == "square" ? "3px" : "50%",
      },
      focus: false,
      selfModel: false,
    };
  },
  computed: {
    model: {
      get() {
        return this.isGroup
          ? this.store
          : this.value !== undefined
          ? this.value
          : this.selfModel;
      },
      set(val) {
        if (this.isGroup) {
          this.dispatch("vyCheckboxGroup", "input", [val]);
        } else {
          this.$emit("input", val);
          this.selfModel = val;
        }
      },
    },
    isChecked() {
      if ({}.toString.call(this.model) === "[object Boolean]") {
        return this.model;
      } else if (Array.isArray(this.model)) {
        return this.model.indexOf(this.label) > -1;
      } else if (this.model !== null && this.model !== undefined) {
        return this.model === this.trueLabel;
      }
    },
    isGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== "vyCheckboxGroup") {
          parent = parent.$parent;
        } else {
          this._checkboxGroup = parent;
          return true;
        }
      }
      return false;
    },
    store() {
      return this._checkboxGroup.value ? this._checkboxGroup.value : this.value;
    },
  },
  methods: {
    addToStore() {
      if (Array.isArray(this.model) && this.model.indexOf(this.label) === -1) {
        this.model.push(this.label);
      } else {
        this.model = this.trueLabel || true;
      }
    },
    handleClick() {
      this.model = !this.model;
      this.$emit("change");
    },
    handleChange(ev) {
      let value;
      if (ev.target.checked) {
        value = this.trueLabel === undefined ? true : this.trueLabel;
      } else {
        value = this.falseLabel === undefined ? false : this.falseLabel;
      }
      this.$emit("change", value, ev);
      this.$nextTick(() => {
        if (this.isGroup) {
          this.dispatch("vyCheckboxGroup", "change", [
            this._checkboxGroup.value,
          ]);
        }
      });
    },
    handleInput(ev) {
      this.$emit("input", ev.target.checked, ev);
    },
  },
  created() {
    this.checked && this.addToStore();
  },
  mounted() {
    console.log(this.model);
  },
};
</script>
<style  scoped>
input {
  cursor: pointer;
}
.my-checkbox {
  color: #606266;
  font-weight: 500;
  font-size: 15px;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  user-select: none;
  margin-right: 30px;
  padding: 6px;
}
.my-checkbox__input {
  white-space: nowrap;
  cursor: pointer;
  outline: none;
  display: inline-block;
  line-height: 1;
  position: relative;
  vertical-align: middle;
}
.my-checkbox:last-of-type {
  margin-right: 0;
}

.my-checkbox__input.is-checked .my-checkbox__inner {
  background-color: #2179d1;
  border-color: #2179d1;
}
.my-checkbox__inner {
  display: inline-block;
  position: relative;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  width: 15px;
  height: 15px;
  background-color: #fff;
  transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
    background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
}
.my-checkbox__input.is-checked .my-checkbox__inner:after {
  transform: rotate(45deg) scaleY(1);
}
.my-checkbox__input.is-disabled.is-checked .my-checkbox__inner:after {
  border-color: #c0c4cc;
}
.my-checkbox__inner:after {
  box-sizing: content-box;
  content: "";
  border: 1px solid #fff;
  border-left: 0;
  border-top: 0;
  height: 7px;
  left: 4px;
  position: absolute;
  top: 1px;
  transform: rotate(45deg) scaleY(0);
  width: 3px;
  transition: transform 0.15s ease-in 0.05s;
  transform-origin: center;
}
.my-checkbox__original {
  opacity: 0;
  outline: none;
  position: absolute;
  margin: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}
.my-checkbox__original[disabled] {
  cursor: not-allowed;
}
.my-checkbox__input.is-checked + .my-checkbox__label {
  color: #2179d1;
}
.my-checkbox__input.is-disabled + span.my-checkbox__label {
  color: #c0c4cc;
  cursor: not-allowed;
}
.my-checkbox__label {
  display: inline-block;
  padding-left: 6px;
  line-height: 19px;
  font-size: 14px;
}
.my-checkbox__input.is-disabled .my-checkbox__inner {
  background-color: #edf2fc;
  border-color: #dcdfe6;
  cursor: not-allowed;
}
</style>