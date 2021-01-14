
import Node from "./node.js" 
import { getNodeKey } from './utils';

export default class Store{
    constructor(options){
          for(let key in options){
              if(options.hasOwnProperty(key)){
                  this[key]=options[key]
              }
          };
          
          this.currentNode=null;
          this.currentNodeKey=null;
          this.nodesMap = {};

          this.root = new Node({
           data: this.data,
           store: this,
          });

          if(this.lazy&&this.load){
            let loadFn=this.load;
            loadFn(this.root, (data) => {
                this.root.doCreateChildren(data);
                this._initDefaultCheckedNodes();
              });
          }else{
              this._initDefaultCheckedNodes();
          }
    }
    
    _initDefaultCheckedNodes(){
         let defaultCheckedKeys=this.selectMode();
        let nodesMap=this.nodesMap;
        defaultCheckedKeys.forEach(key=>{
             let node = nodesMap[key];
             if(node){
                 node.setChecked(true,!this.checkStrictly)
             }
        })
     }
     
     _initDefaultCheckedNode(node) {
        let defaultCheckedKeys=this.selectMode()
        if (defaultCheckedKeys.indexOf(node.key) !== -1) {
          node.setChecked(true, !this.checkStrictly);
        }
      }

      // 选择单选模式还是多选模式 来处理默认选中的节点
      selectMode(){
          let defaultCheckedKeys ;
          if(this.mode=='checkbox'){
            defaultCheckedKeys = this.defaultCheckedKeys || [];
          }else{
            defaultCheckedKeys = this.defaultCheckedKeys? this.defaultCheckedKeys.slice(0,1) :[];
          }
          return defaultCheckedKeys
      }


     setData(newVal) {
        const instanceChanged = newVal !== this.root.data;
        if (instanceChanged) {
          this.root.setData(newVal);
          this._initDefaultCheckedNodes();
        } else {
          this.root.updateChildren();
        }
      }

     // 注销节点
     deregisterNode(node) {
        const key = this.key;
        if (!key || !node || !node.data) return;
    
        node.childNodes.forEach(child => {
          this.deregisterNode(child);
        });
    
        delete this.nodesMap[node.key];
      }
       
    /* 注册节点 */
      registerNode(node){

        let key=this.key;
        if(!key||!node||!node.data) return ;
        
        let nodeKey= node.key;

        if(nodeKey!==undefined) this.nodesMap[nodeKey]=node;
     }
     /* 设置默认展开节点 */
     setDefaultExpandedKeys(keys) {
      keys = keys || [];
      this.defaultExpandedKeys = keys;
  
      keys.forEach((key) => {
        const node = this.getNode(key);
        if (node) node.expand(null, this.autoExpandParent);
      });
    }
   /* 找到每一个默认的节点对象 */
    getNode(data) {
      if (data instanceof Node) return data;
      const key = typeof data !== 'object' ? data : getNodeKey(this.key, data);
      return this.nodesMap[key] || null;
    }

    /* 获取选中的节点 */
    getCheckedNodes(leafOnly = false, includeHalfChecked = false) {
      const checkedNodes = [];
      const traverse = function(node) {
        const childNodes = node.root ? node.root.childNodes : node.childNodes;
  
        childNodes.forEach((child) => {
          if ((child.checked || (includeHalfChecked && child.indeterminate)) && (!leafOnly || (leafOnly && child.isLeaf))) {
            checkedNodes.push(child.data);
          }
  
          traverse(child);
        });
      };
  
      traverse(this);
  
      return checkedNodes;
    }

    
}