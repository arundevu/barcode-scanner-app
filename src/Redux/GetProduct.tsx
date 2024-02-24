import React from "react";
import { ActionType } from "./Action";


export const GetProduct=(product:any)=>{

    return{
        type:ActionType.SET_PRODUCT,
        Payload:product
    }
}
export const DelProduct=(product:any)=>{

    return{
        type:ActionType.DEL_PRODUCT,
        Payload:product
    }
}