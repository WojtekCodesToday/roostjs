export interface JHTMLNode {
    child?: string | JHTML;
    closed?: boolean | string;
    [key: string]: any; // (id, class, src, etc.)
}

export interface JHTML {
    [element: string]: JHTMLNode;
}