export default {
    directives: {
      //拖拽&&缩放指令
      drag: {
        bind: (el, binding) => {
          // console.log(el, "el1111");
          // console.log(binding.value);
          let moveEL = el;
          //let id = el.id;
          // if (id) {
          //   let getHeader = document.getElementById(id + "Header");
          //   if (getHeader) {
          //     moveEL = getHeader;
          //     console.log(moveEL, "moveEL");
          //   }
          // }
  
          //绑定默认样式
          el.style.zIndex = 9999;
          //如果为编辑状态
          if (binding.value || binding.value === undefined) {
            //定义该元素的 top left width height
            let x, y, w, h;
            //鼠标的起始和结束坐标
            let cx_start, cy_start, cx_end, cy_end;
            //判断鼠标样式
            moveEL.onmousemove = e => {
              //获取鼠标当前位置
              let cx_now = e.clientX;
              let cy_now = e.clientY;
              //获取div右下角相对浏览器的位置
              let {
                top: el_top,
                left: el_left,
                width: el_width,
                height: el_height
              } = el.getBoundingClientRect();
              let el_bottom_height = el_top + el_height;
              let el_right_width = el_left + el_width;
              //判断鼠标是否在div下边界
              let mouse_in_bottom =
                cy_now <= el_bottom_height + 5 && cy_now >= el_bottom_height - 5;
              //判断鼠标是否在div右边界
              let mouse_in_right =
                cx_now <= el_right_width + 5 && cx_now >= el_right_width - 5;
              if (mouse_in_bottom && mouse_in_right) {
                el.style.cursor = "se-resize";
              } else if (mouse_in_right) {
                el.style.cursor = "e-resize";
              } else if (mouse_in_bottom) {
                el.style.cursor = "s-resize";
              } else {
                el.style.cursor = "move";
              }
            };
            moveEL.onmousedown = e => {
              let mouse = el.style.cursor;
  
              //对象解构赋值
              let {
                left: el_x,
                top: el_y,
                width: el_w,
                height: el_h
              } = window.getComputedStyle(el);
              x = el_x;
              y = el_y;
              w = el_w;
              h = el_h;
              console.log(x, y, w, h);
              //解决谷歌低版本获取不到情况导致不能拖动
              if (x == 'auto') {
                x = el.offsetLeft;
                y = el.offsetTop;
              }
              cx_start = e.clientX;
              cy_start = e.clientY;
              //绑定移动事件
              document.onmousemove = e => {
                cx_end = e.clientX;
                cy_end = e.clientY;
                //默认左下方向配置
                let x_move = cx_end - cx_start;
                let y_move = cy_end - cy_start;
                let direct = ["width", "height"];
                let pos = [w, h];
                let move = [x_move, y_move];
                let limit = 50;
                //判断鼠标的类型进行对应的操作
                switch (mouse) {
                  case "e-resize":
                    direct = ["width"];
                    pos = [w];
                    move = [x_move];
                    break;
                  case "s-resize":
                    direct = ["height"];
                    pos = [h];
                    move = [y_move];
                    break;
                  case "move":
                    direct = ["left", "top"];
                    pos = [x, y];
                    limit = 0;
                    break;
                }
                handle_div(direct, pos, move, limit);
              };
              //取消移动事件
              document.onmouseup = () => {
                //还原默认样式
                document.onmousemove = null;
              };
              /**
               * 操作DOM位置和大小方法
               * @param direct 方向
               * @param pos 尺寸/坐标
               * @param move 拖动距离
               * @param limit 限定范围
               */
              function handle_div(direct, pos, move, limit) {
                for (let i = 0; i < direct.length; i++) {
                  let val = parseInt(pos[i]) + move[i];
                  val = val <= limit ? limit : val;
                  el.style[direct[i]] = val + "px";
                }
              }
            };
          } else {
            el.style.cursor = "default";
            //移除点击事件
            moveEL.onmousedown = null;
            moveEL.onmousemove = null;
          }
        }
      },
      //只表头可拖动 
      dragHeader(el, binding) {
        let oDiv = el; //当前DIV元素
        let self = this; //上下文
       // console.log(el, "----------------" + binding.value.header);
        let dHeader = document.getElementById(binding.value.headerID);
        document.onselectstart = function () {
          return false;
        };
        if (dHeader) {
          dHeader.onmousedown = function (e) {
            //鼠标按下，计算当前元素距离可视区的距离
            let disX = e.clientX - oDiv.offsetLeft;
            let disY = e.clientY - oDiv.offsetTop;
            document.onmousemove = function (e) {
              //通过事件委托，计算移动的距离
              let l = e.clientX - disX;
              let t = e.clientY - disY;
              if (l < 6) {
                l = 6;
              } else if (l > document.documentElement.clientWidth - 260) {
                l = document.documentElement.clientWidth - 260;
              } else {
                l = e.clientX - disX;
              }
  
              if (t < 0) {
                t = 0;
              } else if (t > document.documentElement.clientHeight - 250) {
                t = document.documentElement.clientHeight - 250;
              } else {
                t = e.clientY - disY;
              }
              //移动当前元素
              oDiv.style.left = l + "px";
              oDiv.style.top = t + "px";
            };
            document.onmouseup = function (e) {
              document.onmousemove = null;
              document.onmouseup = null;
            };
          };
        }
      }
  
    }
  }