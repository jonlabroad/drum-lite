import Transition, { TransitionType } from "./TransitionType";
import ScaleFunctions from "../../util/ScaleFunctions";

export class Linear implements Transition {
    getTNorm(t: number, startTime: number, period: number): number {
        return ScaleFunctions.linear(t, startTime, period);
    }
}

export class CubicEaseOut implements Transition {
    getTNorm(t: number, startTime: number, period: number): number {
        return ScaleFunctions.cubicEaseOut(t, startTime, period);
    }
}

export class CubicEaseInOut implements Transition {
    getTNorm(t: number, startTime: number, period: number): number {
        return ScaleFunctions.cubicEaseInOut(t, startTime, period);
    }
}

export default class Transitions {
    protected static transitionMap: {[key: string]: Transition} = {
        "linear": new Linear(),
        "cubicEaseOut": new CubicEaseOut(),
        "cubicEaseInOut": new CubicEaseInOut()
    };

    public static get(type: TransitionType): Transition {
        return this.transitionMap[type];
    }
}

