import PartialEffect, { EffectParameters } from "./PartialEffect";
import ResolvedEffect from "../../effect/ResolvedEffect";

export default class ComposedEffect<T extends EffectParameters> extends PartialEffect<T> {
    name: string
    children: PartialEffect<any>[][] = []

    constructor(name: string, params: T, isModifier = false, dt = 0) {
        super(params, dt, isModifier);
        this.name = name;
    }

    public addChildren(effects: PartialEffect<any>[][]) {
        this.children.push(...effects);
    }

    public getEffects(): PartialEffect<any>[][] {
        return this.children;
    }

    public getEffect(t: number): ResolvedEffect[][] {
        const allEffects: ResolvedEffect[][] = [];
        this.children.forEach(childGroup => {
            childGroup.forEach(child => {
                allEffects.push(child.getEffect(t))
            });
        });
        return allEffects;
    }

    public isTemporal(): boolean {
        return !!this.children.find(c1 => !!c1.find(c2 => !!c2.isTemporal()));
    }

    public isComplete(t:  number) {
        return !this.children.find(c1 => !c1.find(c2 => c2.isComplete(t)));
    }
}