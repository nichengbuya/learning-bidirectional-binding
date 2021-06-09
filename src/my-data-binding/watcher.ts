import Dep from "./dep";
import { parsePath } from "./utils";

let uid = 0;
export default class Watcher{
    id: number;
    target: any;
    getter: (obj: any) => any;
    callback: any;
    value: void;
    constructor(target: any,expression: string,callback: any){
        this.id = uid++;
        this.target = target;
        this.getter = parsePath(expression);
        this.callback = callback;
        this.value = this.get();
    }
    get(){
        Dep.target = this;
        const obj = this.target;
        let value;
        try{
            value = this.getter(obj);
        }finally{
            Dep.target = null;
        }
        return value;
    }
    update(){
        this.run();
    }
    run(){
        this.getAndInvoke(this.callback);
    }
    getAndInvoke(callback:any){
        const value = this.get();
        if(value !== this.value || typeof value === "object"){
            const oldValue = this.value;
            this.value = value;
            callback.call(this.target,value,oldValue)
        }
    }
}