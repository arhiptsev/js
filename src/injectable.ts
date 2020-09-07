import 'reflect-metadata';

const deps = new WeakMap();

export const Injectable = () => (target: any) => {deps.set(target, {
    instance: null
})};


function getDependencies(constructor: any) {
    return Reflect.getMetadata('design:paramtypes', constructor) || [];
}

function getDependencyInstance(target) {
    const deps = getDependencies(target);
    const depInstances = deps.map(d => getDependency(d));
    return new target(...depInstances);
}


export function getDependency<T = any>(target: any): T {
    const dep = deps.get(target);

    if (!dep.instance) {
        dep.instance = getDependencyInstance(target);
    }

    return dep.instance;
}