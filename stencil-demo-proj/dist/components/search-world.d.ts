import type { Components, JSX } from "../types/components";

interface SearchWorld extends Components.SearchWorld, HTMLElement {}
export const SearchWorld: {
    prototype: SearchWorld;
    new (): SearchWorld;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
