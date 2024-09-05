import { Component, Element, Listen, Prop, State, Watch, h } from "@stencil/core/internal";
import { API_KEY } from "../global/global";

@Component({
    tag: 'stock-price',
    styleUrl: './stock-price.css',
    shadow: true
})
export class StockPrice {
    @Element() el: HTMLElement;
    // intialStockSymbol: string;

    stockInput: HTMLInputElement;

    @State() fetchedPrice: number;
    @State() stockUserInput: string;
    @State() stockInputValid: boolean = false;
    @State() loading: boolean = false;

    @Prop({ mutable: true, reflect: true }) stockSymbol: string;

    @Watch('stockSymbol')
    stockSymbolChanged(newValue: string, oldValue: string) {
        if (newValue !== oldValue) {
            this.stockUserInput = newValue;
            this.fetchStockPrice(newValue);
        }
    }

    componentWillLoad() {
        console.log("Component will load...");
        console.log(this.stockSymbol);
        this.fetchedPrice = 0;
    }
    componentDidLoad() {
        // this.fetchedPrice = 0;
        console.log("Component did load...");
        if (this.stockSymbol) {
            // this.intialStockSymbol = this.stockSymbol;
            this.stockUserInput = this.stockSymbol;
            this.stockInputValid = true;
            this.fetchStockPrice(this.stockSymbol);
        }
    }

    componentWillUpdate() {
        console.log("Component will update...");
    }
    componentDidUpdate() {
        console.log("Component did update...");
        // if (this.stockSymbol !== this.intialStockSymbol) {
        //     this.intialStockSymbol = this.stockSymbol;
        //     this.stockUserInput = this.stockSymbol;
        //     this.fetchStockPrice(this.stockUserInput)
        // }

    }
    // componentDidUnload() {
    //     console.log("Component did unload...");
    // }
    disconnectedCallback() {
        console.log("Component disconnected...");
    }

    onUserInput(event: Event) {
        console.log("entered onUserInput method")
        this.stockUserInput = (event.target as HTMLInputElement).value;
        if (this.stockUserInput.trim() === '') {
            this.stockInputValid = false;
        } else {
            this.stockInputValid = true;
        }
    }

    @Listen('SymbolSelected', { target: 'body' })
    onStockSymbol(event: CustomEvent) {
        console.log("stock symbol selected: " + event.detail);
        if (event.detail) {
            this.stockSymbol = event.detail;
        }

    }

    fetchStockPrice(stockSymbol: string) {
        this.loading = true;
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${API_KEY}`)
            .then(response => response.json())
            .then((parsedResponse) => {
                console.log(parsedResponse['Global Quote']['05. price']);
                this.fetchedPrice = +parsedResponse['Global Quote']['05. price'];
                this.loading = false;
            })
            .catch(err => {
                console.log(err)
                this.loading = false;
            });
    }

    onFetchStockPrice(event: Event) {
        event.preventDefault();
        console.log("submitted");
        // const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
        // const stockSymbol = this.stockInput.value;
        this.stockSymbol = this.stockInput.value;
        // this.fetchStockPrice(stockSymbol);
    }
    render() {
        let dataContent = null;
        if (this.loading) {
            // dataContent = <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
            dataContent = <my-spinner></my-spinner>
        }
        else {
            dataContent = <h1>Stock Price: ${this.fetchedPrice}</h1>
        }
        return [
            <form onSubmit={this.onFetchStockPrice.bind(this)}>
                <input
                    id="stock-symbol"
                    ref={el => this.stockInput = el}
                    value={this.stockUserInput}
                    onInput={this.onUserInput.bind(this)}
                    placeholder="Enter Stock Symbol" />
                <button type="submit" disabled={!this.stockInputValid || this.loading}>Fetch Price</button>
            </form>,
            <div>{dataContent}</div>
        ];
    }
}