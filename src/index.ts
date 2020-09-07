import { Injectable, getDependency } from "./injectable";
import 'zone.js';
class service1 {
    constructor() {

    }

    async test2() {
        await new Promise(resolve => setTimeout(resolve, 3000));
        await new Promise(resolve => setTimeout(resolve, 4000));
        console.log(Zone.current.get('token'))
    }



    async test1() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(Zone.current.get('token'))
    }

}


const testInstance = new service1(); 

Zone.current.fork({
    name: Math.random().toString(),
    properties: {
        token: 'for second zone'
    }
}).run(() => testInstance.test2())
Zone.current.fork({
    name: Math.random().toString(),
    properties: {
        token: 'for first zone'
    }
}).run(() => testInstance.test1())






// @Injectable()
// class service4 {

//     showMe() {
//         console.log('service4')
//     }
// }


// @Injectable()
// class service3 {
//     constructor(
//         public first: service4
//     ) {
//     }

//     showMe() {
//         console.log('service3')
//     }
// }

// @Injectable()
// class service2 {
//     constructor(
//         public first: service3
//     ) {
//     }
//     showMe() {
//         setTimeout(() => {
//             console.log((Zone.current.get('token') + ' show Me'))
//         }, 1000);
//         console.log('service2')
//     }

//     ttt() {
//         setTimeout(() => {
//             console.log(Zone.current.get('token') + 'ttt');
//         }, 1000);
//     }
// }
