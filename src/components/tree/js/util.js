/**
 *  发布订阅模式，
 *  消息发布中心
 * @class BroadCast
 */
class BroadCast {
    constructor() {
      this.listMap = {}; // 存储监听者
    }
    emit(k, v) { // 发布消息函数,k为监听者的key，v为需要传值的value
      this.listMap[k] &&
        this.listMap[k].map((fn) => {
          fn.call(null, v);
        });
    }
    on(k, fn) { // 添加监听者,k为监听者的key，fn为执行的回调函数
      if (!this.listMap[k]) {
        this.listMap[k] = [];
      }
      this.listMap[k].push(fn);
    };
    off(k,fn){ // 取消监听,k为监听者的key
       if(this.listMap[k]){
         delete this.listMap[k]
       }
    };
  }
  
  const broadCast = new BroadCast();
  export default { // 这部分是要Mixins到组件里面
    methods: {  // 定义broadcast发布消息方法
      broadCast(k, v) {
        broadCast.emit(k, v);
      },
      on(k, fn) { // 定义接收消息方法
        broadCast.on(k, fn);
      },
      off(k,fn){
        //定义注销监听的方法
        broadCast.off(k, fn);
      }
    },
  };
  