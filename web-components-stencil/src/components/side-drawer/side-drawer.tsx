import { Component, Method, Prop, State, h } from "@stencil/core";

@Component({
    tag: 'side-drawer',
    styleUrl: 'side-drawer.css',
    shadow: true
})
export class SideDrawer {
    // @Prop({ reflect: true }) title: string;
    // @Prop() open: boolean;

    // render() {
    //     let content = null;
    //     if (this.open) {
    //         content = (
    //             <div>
    //                 <header>
    //                     <h1>{this.title}</h1>
    //                 </header>
    //                 <main>
    //                     <slot></slot>
    //                 </main>
    //             </div>
    //         );
    //     }
    //     return content;
    // }

    @State() showContactInfo: boolean = false;

    @Prop({ reflect: true }) title: string;
    @Prop({ reflect: true, mutable: true }) open: boolean;

    onCloseDrawer() {
        this.open = false;
        console.log('side-drawer closed ' + this.open);
    }

    onContentChange(content: string) {
        console.log(content);
        this.showContactInfo = (content === "contact");
    }

    @Method()
    openDrawer() {
        this.open = true;
        console.log('side-drawer opened' + this.open);
    }

    render() {
        let mainContent = <slot></slot>;
        if (this.showContactInfo) {
            mainContent = (
                <div id="contact-information">
                    <h2>Contact Information</h2>
                    <p>You can reach us via phone or email.</p>
                    <ul>
                        <li>Phone: 49802384032</li>
                        <li>
                            E-Mail:
                            <a href="mailto:something@something.com">
                                something@something.com
                            </a>
                        </li>
                    </ul>
                </div>
            );
        }
        // else {
        //     mainContent = (
        //         <div>
        //             <h1>Alternate Main Content</h1>
        //         </div>
        //     )
        // }
        return (
            [
                <div class={"backdrop"} onClick={this.onCloseDrawer.bind(this)}></div>,
                <aside>
                    <header>
                        <h1>{this.title}</h1>
                        <button onClick={this.onCloseDrawer.bind(this)}>X</button>
                    </header>
                    <section id="tabs">
                        <button class={this.showContactInfo ? '' : 'active'} onClick={this.onContentChange.bind(this, "nav")}>Navigate</button>
                        <button class={this.showContactInfo ? 'active' : ''} onClick={this.onContentChange.bind(this, "contact")}>Contact</button>
                    </section>
                    <main>
                        {mainContent}
                    </main>
                </aside>
            ]
        );
    }
}