import { arrayMethods } from './array';
import defineReactive from './defineReactive';
import Dep from './dep';
import observe from './observe';
import{def} from './utils';

export default class Observer{
    dep: Dep;
    constructor(value:any){
        def(value,'__ob__',this,false);
        console.log("Observer构造器", value);
        this.dep = new Dep();
        if(Array.isArray(value)){
            Object.setPrototypeOf(value,arrayMethods);
            this.observeArray(value);
        }else{
            this.walk(value)
        }
    }
    walk(value:Object){
        for(let k in value){
            defineReactive(value,k)
        }
    }
    observeArray(arr:any[]){
        for(let i of arr){
            observe(i);
        }
    }
}