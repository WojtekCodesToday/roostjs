import type { JHTML } from "./jhtml";
export * from "./jhtml";

export interface Roost {
    convert: (jhtml?: JHTML) => string;
    convertJSX: (tag: string | Function, props?: any, ...children: any[]) => JHTML;
    extensions: Record<string, any>;
}