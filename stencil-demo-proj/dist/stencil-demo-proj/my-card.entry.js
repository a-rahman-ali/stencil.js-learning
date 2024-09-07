import { r as registerInstance, h } from './index-dc0b858a.js';

const myCardCss = ".my-card-wrapper{width:600px;margin:50px;padding:20px;border-radius:10%;border:3px solid #ccc;display:inline-block;font-family:\"system-ui\"}.card-custom{width:250px;margin:20px;padding:20px;border-radius:10%;border:2px solid rgb(102, 15, 15)}button{border:none;border-radius:5px;color:white;padding:15px 32px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;background-color:black;margin-right:30px}.btn-react{background-color:rgb(100, 139, 246)}.my-input-textbox{width:100%;padding:12px 20px;margin:8px 0;display:inline-block;border:1px solid #ccc;border-radius:4px;box-sizing:border-box}";

const MyCard = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.userName = undefined;
        this.APIData = undefined;
        this.showReactCard = false;
        this.showStencilCard = false;
        this.myStencilUsers = undefined;
        this.myReactUsers = undefined;
    }
    onUserInput(event) {
        event.preventDefault();
        this.userName = event.target.value;
    }
    // connectedCallback() {
    //     console.log('componentConnectedCallback');
    // }
    // disconnectedCallback() {
    //     console.log('componentDisconnectedCallback');
    // }
    // componentWillLoad() {
    //     // this method is called only once, it's a good place to load the data asynchronously
    //     console.log('contentWillLoad component is about to be loaded');
    // }
    // componentWillRender() {
    //     // It's always recommended to make any rendered state updates withing componentWillRender()
    //     // this.APIData = 'updated in componentWillRender';
    //     console.log('componentWillRender');
    // }
    // componentDidLoad() {
    //     // called once just after the component is fully loaded and when first render() occurs.
    //     console.log('componentDidLoad');
    //     this.APIData = 'updated in componentDidLoad';
    // }
    // componentDidRender() {
    //     console.log('componentDidRender');
    // }
    // componentShouldUpdate() {
    //     // this hook is called when a component's Prop or State property changes
    //     // and a re-render is about to be requested
    //     console.log('componentShouldUpdate');
    //     // return false; // If this returns false then no component should be updated and further hooks won't work
    // }
    // componentWillUpdate() {
    //     console.log('componentWillUpdate');
    //     console.log('This is being called since we are updating this.APIData in componentDidLoad');
    // }
    // @Watch('userName')
    // watchHandler(newValue: string, oldValue: string) {
    //     console.log(`The old value ${oldValue} and new value is ${newValue}`);
    // }
    // changeStates() {
    //     this.userName = 'Changed-Stencil-Demo-Proj';
    //     this.APIData = `We've got the data from API`;
    //     // this.showCard = !this.showReactCard;
    //     this.showReactCard = false;
    //     alert(`this.showCard value : ${this.showReactCard}`);
    // }
    // componentWillUpdate() {
    //     console.log('componentWillUpdate');
    // }
    // componentDidRender() {
    //     console.log('componentDidRender');
    // }
    componentDidLoad() {
        console.log('componentDidLoad');
        this.APIData = 'loading...';
        fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo')
            .then(response => response.json())
            .then(parsedRes => {
            var metaDeta = parsedRes['Meta Data'];
            var timeDateStencil = metaDeta['1. Information'];
            this.APIData = timeDateStencil;
            console.log(this.APIData);
        })
            .catch(err => console.log(err));
    }
    getStencilUserFromAPI() {
        this.myStencilUsers = 'loading data...';
        fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo')
            .then(res => {
            return res.json();
        })
            .then(parsedRes => {
            var timeSeries = parsedRes['Time Series (5min)'];
            console.log(timeSeries);
            var timeDateStencil = timeSeries['2024-06-25 19:50:00'];
            // console.log(`Stencil timeSeries ${timeDateStencil}`);
            this.myStencilUsers = timeDateStencil['5. volume'];
        }).catch(ex => { console.log(ex); });
    }
    getReactUserFromAPI() {
        this.myReactUsers = 'loading data...';
        fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo')
            .then(res => {
            return res.json();
        })
            .then(parsedRes => {
            var timeSeries = parsedRes['Time Series (5min)'];
            console.log(timeSeries);
            var timeDateReact = timeSeries['2024-06-25 19:55:00'];
            // console.log(`React timeSeries ${timeDateReact}`);
            this.myReactUsers = timeDateReact['5. volume'];
        })
            .catch(ex => { console.log(ex); });
    }
    fetchMyDataFromAPI(contentType) {
        if (contentType == 'stencil') {
            this.getStencilUserFromAPI();
        }
        else {
            this.getReactUserFromAPI();
        }
    }
    onContentChange(content) {
        if (content === 'reactcard') {
            this.showReactCard = true;
            this.showStencilCard = false;
        }
        else if (content === 'stencilcard') {
            this.showReactCard = false;
            this.showStencilCard = true;
        }
        else {
            this.showReactCard = false;
            this.showStencilCard = false;
        }
    }
    searchWorldNameSelected(event) {
        console.log(event.detail);
        this.userName = event.detail;
    }
    render() {
        // setTimeout(() => {
        //     this.changeStates();
        // }, 2000);
        let reactContent = (h("div", { key: 'b3cf73f2875327b89e45720e294cbce2cca0e481' }, h("div", { key: '7729b224767617a5a05c19cc02c7faabc84cd557', class: "card-custom", id: "react-div" }, "Hello, from React ", h("br", { key: '5ff8d7d9bbd4c9dffd9001ee1a95fc190b9aebb2' }), " Live Users ", h("span", { key: '4db7f4e348d17421c0e0976bca17f0d4b4d1ace7' }, this.myReactUsers), h("button", { key: 'ce85e217fb7f2e34017468abef38ee7a689e9277', class: "btn-react small-btn", onClick: this.fetchMyDataFromAPI.bind(this, 'react') }, "Get React Users"), " ", h("br", { key: 'd2101e61a9a9861185b41613fa0fb0b72334fde6' }))));
        let stencilContent = (h("div", { key: '9d8637956c9473027d6b599428290332f3bccef7' }, h("div", { key: '9e9fb5e010232c93657e68e7d90737358712994e', class: "card-custom", id: "stencil-div" }, "Hello, from Stencil", h("br", { key: 'd0c5dfd46e803e9a43632a649f0aba7b3e2b49b9' }), "Live Users ", h("span", { key: '1a852f1d81c2551e542b3d0ecb5203e5a377e786' }, this.myStencilUsers), h("button", { key: 'a06befa68ae0960bca475b06d19336de89faa176', class: "btn-stencil small-btn", onClick: this.fetchMyDataFromAPI.bind(this, 'stencil') }, "Get Stencil Users"), " ", h("br", { key: '2d5eb73f6469c29338948ca9b0a7d7439ea1e1c9' }), h("br", { key: '79439812f51cad03cce956a0f80c6a6ffe1d1a08' }))));
        // let contentToDisplay = '';
        // if (this.showReactCard) {
        //     contentToDisplay = reactContent;
        // }
        let contentToDisplay = '';
        if (this.showReactCard) {
            contentToDisplay = reactContent;
        }
        else if (this.showStencilCard) {
            contentToDisplay = stencilContent;
        }
        let mainContent = (h("div", { key: 'df1283a761cdbcec517efad168d8d043f108e785', class: "my-card-wrapper" }, h("h1", { key: 'd7d62b6bc77564c06680533948b1d4c91b6fd03a' }, "Hi, I am ", this.userName), h("h5", { key: '05cea991e47e81528edf7ee3395af0fa60b9797c' }, this.APIData), h("button", { key: '5d86c1a375a30e5a0c7e82f904d66dfc374d412c', class: "btn-stencil", onClick: this.onContentChange.bind(this, 'stencilcard') }, "Stencil"), h("button", { key: '0ae3b2e33e98e0196f33039adeb4c4590dd4ce4e', class: "btn-react", onClick: this.onContentChange.bind(this, 'reactcard') }, "React"), contentToDisplay, h("hr", { key: 'c84bbfb354cbb3fba632989bb74466fa9c7fa73d' }), h("h3", { key: 'c3802471d8f54dec9ef778a2d15d036355b5c01c' }, "Two way data-binding in stencil"), h("input", { key: '5cb3bcf055a1f9530872b906660db88c586c56fa', type: "text", class: "my-input-textbox", onInput: this.onUserInput.bind(this), value: this.userName })));
        return mainContent;
        // let mainContent = (
        //     <div class="my-card-wrapper">This is my Card</div>
        // );
        // return mainContent;
        // return (
        //     <div>
        //         <div class="my-card-wrapper">My Card</div>
        //         <div class="my-card-wrapper">My Card</div>
        //     </div>
        // );
    }
};
MyCard.style = myCardCss;

export { MyCard as my_card };

//# sourceMappingURL=my-card.entry.js.map