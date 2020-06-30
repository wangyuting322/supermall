import {ADD_COUNT,ADD_TO_CART} from './mutations-types'
export default {
  addCart(context, payLoad) {
    // 使用promise包装起来，成功时toast提示
   return new Promise((resolve,reject)=>{

    let oldProduct = null;
    for (let item of context.state.cartList) {
      if (item.iid === payLoad.iid) {
        oldProduct = item;
      }
    }
    if (oldProduct) {
      context.commit(ADD_COUNT, oldProduct)
      resolve('当前数量+1咯')
    }
    else {
      context.commit(ADD_TO_CART, payLoad)
      resolve('添加商品成功')
    }

   })
  }
}