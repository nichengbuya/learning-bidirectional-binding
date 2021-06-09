let uid = 0;
export default class Dep{
    id: number;
    subs: any[];
    static target: any;
    constructor(){
        this.id = uid++;
        this.subs = [];
    }
    addSub(sub:any){
        this.subs.push(sub)
    }
    removeSub(sub:any){
        const index= this.subs.indexOf(sub);
        if(index>-1){
           return  this.subs.splice(index,1)
        }
    }
    depend(){
        if(Dep.target){
            this.addSub(Dep.target)
        }
    }
    notify(){
        const subs = this.subs.slice();
        for(let s of subs){
            s.update();
        }
    }

}