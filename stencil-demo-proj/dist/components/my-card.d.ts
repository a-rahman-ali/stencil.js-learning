import type { Components, JSX } from "../types/components";

interface MyCard extends Components.MyCard, HTMLElement {}
export const MyCard: {
    prototype: MyCard;
    new (): MyCard;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
