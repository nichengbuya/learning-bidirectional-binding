import Dep from "./dep";
import observe from "./observe";

export default function defineReactive(data: any,key: any,val?: any){
    const dep = new Dep();
    if(arguments.length === 2){
        val = data[key]
    }
    let childOb = observe(data[key])
    Object.defineProperty(data,key,{
        enumerable:true,
        configurable:true,
        set(newValue){
            console.log(`set:${key},${newValue}`);
            if(val === newValue){
                return;
            }
            val = newValue;
            observe(newValue);
            dep.notify();
        },
        get(){
            console.log(`get:${key},${val}`)
            if(Dep.target){
                dep.depend();
                if(childOb){
                    childOb.dep.depend();
                }
            }
            return val;
        }
    })
}