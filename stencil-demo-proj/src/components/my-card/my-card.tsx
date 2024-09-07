import { Component, Listen, Prop, State, h } from "@stencil/core/internal";

@Component({
    tag: 'my-card',
    styleUrl: 'my-card.css',
    shadow: true
})
export class MyCard {
    @Prop({ mutable: true }) userName: string;
    @State() APIData: string;
    @State() showReactCard: boolean = false;
    @State() showStencilCard: boolean = false;

    @State() myStencilUsers: string;
    @State() myReactUsers: string;

    onUserInput(event: Event) {
        event.preventDefault();
        this.userName = (event.target as HTMLInputElement).value;
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
            }).catch(ex => { console.log(ex) });

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
            .catch(ex => { console.log(ex) });
    }

    fetchMyDataFromAPI(contentType: string) {
        if (contentType == 'stencil') {
            this.getStencilUserFromAPI();
        } else {
            this.getReactUserFromAPI();
        }
    }

    onContentChange(content: string) {
        if (content === 'reactcard') {
            this.showReactCard = true;
            this.showStencilCard = false;
        } else if (content === 'stencilcard') {
            this.showReactCard = false;
            this.showStencilCard = true;
        } else {
            this.showReactCard = false;
            this.showStencilCard = false;
        }
    }

    @Listen('searchWorldNameSelected', { target: 'body' })
    searchWorldNameSelected(event: CustomEvent<string>) {
        console.log(event.detail);
        this.userName = event.detail;
    }

    render() {
        // setTimeout(() => {
        //     this.changeStates();
        // }, 2000);
        let reactContent = (
            <div>
                <div class="card-custom" id="react-div">
                    {/* Hello, from React <br></br> Live Users <span>{ }</span> */}
                    {/* <button class="btn-react small-btn">Get React Users</button> <br></br> */}
                    Hello, from React <br></br> Live Users <span>{this.myReactUsers}</span>
                    <button class="btn-react small-btn" onClick={this.fetchMyDataFromAPI.bind(this, 'react')}>Get React Users</button> <br></br>
                </div>
            </div>
        );

        let stencilContent = (
            <div>
                <div class="card-custom" id="stencil-div">
                    Hello, from Stencil
                    <br></br>
                    {/* Live Users <span>{ }</span> */}
                    {/* <button class="btn-stencil small-btn" >Get Stencil Users</button> <br></br> */}
                    Live Users <span>{this.myStencilUsers}</span>
                    <button class="btn-stencil small-btn" onClick={this.fetchMyDataFromAPI.bind(this, 'stencil')}>Get Stencil Users</button> <br></br>
                    <br></br>
                </div>
            </div>
        );

        // let contentToDisplay = '';
        // if (this.showReactCard) {
        //     contentToDisplay = reactContent;
        // }

        let contentToDisplay = '';
        if (this.showReactCard) {
            contentToDisplay = reactContent;
        } else if (this.showStencilCard) {
            contentToDisplay = stencilContent;
        }

        let mainContent = (
            <div class="my-card-wrapper">
                <h1>Hi, I am {this.userName}</h1>
                <h5>{this.APIData}</h5>

                <button class="btn-stencil" onClick={this.onContentChange.bind(this, 'stencilcard')}>Stencil</button>
                <button class="btn-react" onClick={this.onContentChange.bind(this, 'reactcard')}>React</button>

                {/* {stencilContent} */}
                {/* {reactContent} */}
                {contentToDisplay}
                <hr></hr>
                <h3>Two way data-binding in stencil</h3>
                <input type="text" class="my-input-textbox" onInput={this.onUserInput.bind(this)} value={this.userName} />
            </div>
        )
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
}