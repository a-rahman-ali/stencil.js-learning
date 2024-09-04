/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface MyComponent {
        /**
          * The first name
         */
        "first": string;
        /**
          * The last name
         */
        "last": string;
        /**
          * The middle name
         */
        "middle": string;
    }
    interface SideDrawer {
        "open": boolean;
        "openDrawer": () => Promise<void>;
        "title": string;
    }
}
declare global {
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
    }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new (): HTMLMyComponentElement;
    };
    interface HTMLSideDrawerElement extends Components.SideDrawer, HTMLStencilElement {
    }
    var HTMLSideDrawerElement: {
        prototype: HTMLSideDrawerElement;
        new (): HTMLSideDrawerElement;
    };
    interface HTMLElementTagNameMap {
        "my-component": HTMLMyComponentElement;
        "side-drawer": HTMLSideDrawerElement;
    }
}
declare namespace LocalJSX {
    interface MyComponent {
        /**
          * The first name
         */
        "first"?: string;
        /**
          * The last name
         */
        "last"?: string;
        /**
          * The middle name
         */
        "middle"?: string;
    }
    interface SideDrawer {
        "open"?: boolean;
        "title"?: string;
    }
    interface IntrinsicElements {
        "my-component": MyComponent;
        "side-drawer": SideDrawer;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
            "side-drawer": LocalJSX.SideDrawer & JSXBase.HTMLAttributes<HTMLSideDrawerElement>;
        }
    }
}
