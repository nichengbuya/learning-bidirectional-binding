export function def(obj: any,key: PropertyKey,value: any,enumerable: any){
    Object.defineProperty(obj,key,{
        enumerable,
        value,
        writable:true,
        configurable:true
    })
}
export function parsePath(str:string){
    let segments = str.split('.');
    return function(obj:any){
        for(let i of segments){
            if(!obj){
                return;
            }
            obj = obj[i];
        }
        return obj;
    }
}