import { def } from "./utils";

const arrayPrototype = Array.prototype;
export const arrayMethods = Object.create(arrayPrototype);

const methodsNeedChange: any = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
];

for (let method of methodsNeedChange) {

    const original = arrayPrototype[method];
    def(arrayMethods, method,  function(this:any) {
        //this 指向调用该方法的数组
        const result = original.apply(this,arguments)
        const args:any = [...arguments as any];
        const ob = this.__ob__;
        //对新添加的项进行监听
        let inserted = [];
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice': {
                inserted = args.slice(2);
                break;
            }
        }
        if (inserted.length) {
            ob.observeArray(inserted);
        }
        ob.dep.notify();
        return result;
    }, false)
}
