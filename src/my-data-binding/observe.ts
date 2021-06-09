import Observer from "./observer";

export default function observe(val: any){
    if(typeof val !== 'object'){
        return;
    }
    let ob;
    if(val.__ob__ ){
        ob = val.__ob__;
    } else{
        ob = new Observer(val);
    }
    return ob;
}