import Toast from "./Toast"
const toast = {}

// 默认会有一个参数为Vue
toast.install = function(Vue){
  
// 1.创建组件构造器
const toastConstructor = Vue.extend(Toast)

// 2.new的方式，根据组件构造器，可以创建出来一个组件对象
const toast = new toastConstructor()

//3.将组件对象，手动挂载到某一个元素上(把toast挂载到新的元素div中)
toast.$mount(document.createElement('div'))

// 4.toast.$el对应的就是div 
document.body.appendChild(toast.$el)
 
// 在原型中定义$toast
Vue.prototype.$toast = toast;
}

export default toast