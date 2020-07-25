import RunnableEffect from "../../effect/RunnableEffect";

export default abstract class FullConfig {
    public abstract getEffects(): {
        triggered: RunnableEffect[],
        ambient: RunnableEffect[]
    };
}