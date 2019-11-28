import RGB from "../RGB";

export default interface JsonEffectConfig {
    typeName: string,
    className: string,
    parameters: {[key: string]: string | number | boolean | RGB | undefined | null | string[] | number[] | boolean[] | RGB[]}
}