export type TransitionType = "linear" | "cubicEaseOut" | "cubicEaseInOut";

export default interface Transition {
    getTNorm(t: number, startTime: number, period: number): number;
}