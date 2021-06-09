import observe from "./my-data-binding/observe"
import Watcher from "./my-data-binding/watcher";

let data:any = {
    a:{
        b:{
            c:100
        }
    },
    d:{
        e:[11,22,33,44,55]
    }
}
observe(data);
new Watcher(data,'a.b.c',(val:any)=>{
    console.log(`watcher listen ${val}`)
})
data.a.b.c = 90
// data.a.b.c = 90
// data.d = {
//     f:10,
//     g:9
// }
// data.d.g = 8