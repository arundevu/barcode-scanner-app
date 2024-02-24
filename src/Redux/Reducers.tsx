import { ActionType } from "./Action";

const initialState = {
    product:[]
};
  
  const cartReducer = (state = initialState,action:any) => {
    switch (action.type) {
      case ActionType.SET_PRODUCT:
        return {
         ...state,
         product:[...state.product,action.Payload]
        };
      case ActionType.DEL_PRODUCT:
        return {
         ...state,
         product:action.Payload
        };
      default:
        return state;
    }
  };
  
  export default cartReducer;