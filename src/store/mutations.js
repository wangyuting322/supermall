import {ADD_COUNT,ADD_TO_CART} from './mutations-types'
export default {
  // addCart(state, payLoad) {
  //   let oldProduct = null;
  //   for (let item of state.cartList) {
  //     if (item.iid === payLoad.iid) {
  //       oldProduct = item;
  //     }

  //   }
  //       if (oldProduct) {
  //         oldProduct.count +=1
  //       }
  //       else {
  //         payLoad.count = 1;
  //         state.cartList.push(payLoad)
  //       }
  // }


  [ADD_COUNT](state, payLoad) {
    payLoad.count ++
  },
  [ADD_TO_CART](state, payLoad) {
    payLoad.count = 1;
    payLoad.isChecked = true;
    state.cartList.push(payLoad)
  },
  isCheckedChange(state,payLoad){
    
    for(let item of state.cartList){
      if(item.iid == payLoad){
        item.isChecked = !item.isChecked
      }
    }
  },
  allNotCheck(state){
    state.cartList.forEach(item=>{
     item.isChecked = false
    })
  },
  allCheck(state){
    state.cartList.forEach(item=>{
     item.isChecked = true
    })
  }
}