import { TransitionType } from "../config/transitions/TransitionType";
import Transitions from "../config/transitions/Transitions";

export default class NoteScaler {
    public static scale(velocity: number, transitionType?: TransitionType) {
        const linear = velocity / 127;
        const transition = Transitions.get(transitionType ?? "linear");
        return transition.getTNorm(linear, 0, 1);
    }
}