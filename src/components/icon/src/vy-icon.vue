<template>
  <div>
    <i :class="'vy-icon-' + name"></i>
  </div>
</template>

<script>
export default {
  name: "VyIcon",
  props: {
    name: String,
  },
};
</script>
<style >
@font-face {
  font-family: "iconfont";
  src: url("../icon-font/iconfont.eot");
  src: url("../icon-font/iconfont.eot?#iefix") format("embedded-opentype"),
    url("../icon-font/iconfont.woff2") format("woff2"),
    url("../icon-font/iconfont.woff") format("woff"),
    url("../icon-font/iconfont.ttf") format("truetype"),
    url("../icon-font/iconfont.svg#iconfont") format("svg");
}
[class^="vy-icon-"],
[class*=" vy-icon-"] {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.vy-icon-ios-top::before {
  content: "\e60b";
}
.vy-icon-bottom::before {
  content: "\e824";
}
.vy-icon-left::before {
  content: "\e609";
}
.vy-icon-right::before {
  content: "\e601";
}
.vy-icon-folder::before {
  content: "\e606";
}
.vy-icon-loading::before {
  content: "\e604";
}
.vy-icon-ios-left::before {
  content: "\e600";
}
.vy-icon-ios-right::before {
  content: "\e6da";
}
.vy-icon-ios-loading::before {
  content: "\e603";
}
.vy-icon-android-left::before {
  content: "\edae";
}
.vy-icon-android-right::before {
  content: "\e65c";
}
.vy-icon-full-left::before {
  content: "\e634";
}
.vy-icon-full-right::before {
  content: "\e63e";
}

/* 动画 */
.vy-icon-ios-loading,
.vy-icon-loading {
  animation: loading 2s linear infinite;
  -moz-animation: loading 2s linear infinite; /* Firefox */
  -webkit-animation: loading 2s linear infinite; /* Safari and Chrome */
  -o-animation: loading 2s linear infinite; /* Opera */
}
@keyframes loading {
  0% {
    transform: rotateZ(20deg);
  }
  25% {
    transform: rotateZ(90deg);
  }
  50% {
    transform: rotateZ(180deg);
  }
  75% {
    transform: rotateZ(270deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
</style>