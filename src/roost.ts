import type { JHTML, JHTMLNode, Roost } from "./roost_i";
export * from "./roost_i";
const roost: Roost = {
    /// convert
    convert: (jhtml?: JHTML): string => {
        if (!jhtml) return "";
        let html = "";

        for (const element in jhtml) {
            if (Object.prototype.hasOwnProperty.call(jhtml, element)) {
                const [tag, rawId] = element.split("-");
                
                const attributes = jhtml[element];
                let content = "";

                if (typeof attributes === "object" && attributes !== null) {
                    if ("child" in attributes) {
                        content = typeof attributes.child === "object" && attributes.child !== null
                            ? roost.convert(attributes.child as JHTML) 
                            : String(attributes.child ?? "");
                    }

                    if (tag === "") {
                        html += `${content}`;
                    } else {
                        let obj = `<${tag}`;
                        let isClosed = false;

                        for (const attribute in attributes) {
                            if (attribute === "child") continue;

                            if (attribute === "closed") {
                                isClosed = true;
                            } else if (Object.prototype.hasOwnProperty.call(attributes, attribute)) {
                                const value = attributes[attribute];
                                obj += ` ${attribute}="${String(value)}"`;
                            }
                        }
                        /*          if its closed    />  OR  >           if its closed </tag> or nothing*/
                        html += `${obj}${isClosed ? "/" : ""}>${content}${!isClosed ? `</${tag}>` : ""}`;
                    }
                }
            }
        }
        return html;
    },
    
    // FIXME: make it an extension to the library instead?
    // roost.extensions["roost-jsx"].convertJSX()
    
    convertJSX: (tag: string | Function | null, props?: any, ...children: any[]): JHTML => {
        if (typeof tag === "function" && tag !== roost.convertJSX) {
            const validChildren = children.filter(child => child !== null && child !== undefined && child !== "");
            const componentProps: any = { ...(props || {}) };

            if (validChildren.length === 1) {
                componentProps.children = validChildren[0];
            } else if (validChildren.length > 1) {
                componentProps.children = validChildren;
            }

            return tag(componentProps);
        }

        const nodeAttributes: JHTMLNode = {};

        if (props && typeof props === "object") {
            for (const key in props) {
                if (Object.prototype.hasOwnProperty.call(props, key)) {
                    let k = key;
                    let value = props[key];

                    if (k.endsWith("Name")) {
                        k = k.substring(0, k.length - 4);
                    } else if (k.startsWith("html")) {
                        k = k.substring(4).toLowerCase();
                    } else {
                        k = k.toLowerCase();
                    }

                    if (k === "style" && value && typeof value === "object") {
                        value = Object.keys(value)
                            .map(styleKey => {
                                const cssKey = styleKey.replace(/([A-Z])/g, "-$1").toLowerCase();
                                return `${cssKey}: ${value[styleKey]};`;
                            })
                            .join(" ");
                    }

                    nodeAttributes[k] = value;
                }
            }
        }

        const validChildren = children.filter(child => child !== null && child !== undefined && child !== "");

        if (validChildren.length > 0) {
            if (validChildren.length === 1) {
                const child = validChildren[0];
                nodeAttributes.child = (typeof child === "object" && child !== null) ?
                                            child
                                        :
                                            String(child);
            } else {
                const childMap: JHTML = {};
                validChildren.forEach((child, idx) => {
                    childMap[`-${idx}`] = {
                        child: (typeof child === "object" && child !== null) ?
                                    child 
                                : 
                                    String(child)
                    };
                });
                nodeAttributes.child = childMap;
            }
        } else {
            nodeAttributes.closed = true;
        }

        let actualTag = (typeof tag === "string") ? tag :"";
        
        const finalTagKey = actualTag === "" ? "-0" : (actualTag.includes("-") ? actualTag : `${actualTag}-0`);

        return {
            [finalTagKey]: nodeAttributes
        };
    },
    extensions: {}
};

export default roost;