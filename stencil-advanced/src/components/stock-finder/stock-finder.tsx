import { Component, Event, EventEmitter, State, h } from "@stencil/core";
import { API_KEY } from "../global/global";

@Component({
    tag: 'stock-finder',
    styleUrl: './stock-finder.css',
    shadow: true
})
export class StockFinder {
    stockNameInput: HTMLInputElement;

    @State() searchResults: { symbol: string, name: string }[] = [];
    @State() loading: boolean = false;


    @Event({ bubbles: true, composed: true }) SymbolSelected: EventEmitter<string>;

    onSelectSymbol(symbol: string) {
        console.log("onSelectSymbol called");
        this.SymbolSelected.emit(symbol);
    }

    onFindStock(event: Event) {
        event.preventDefault();
        this.loading = true;
        const stockName = this.stockNameInput.value;
        console.log("onFindStock called");
        fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${API_KEY}`)
            .then(response => response.json())
            .then((parsedResponse) => {
                console.log(parsedResponse);
                this.searchResults = parsedResponse['bestMatches'].map(match => {
                    // console.log(match);
                    return {
                        symbol: match['1. symbol'],
                        name: match['2. name']
                    }
                })
                console.log(this.searchResults);
                this.loading = false;
            })
            .catch(err => {
                console.log(err);
                this.loading = false;
            }
            );

    }

    render() {
        let dataContent = null;
        if (this.loading) {
            dataContent = <my-spinner></my-spinner>
        }
        else {
            dataContent = <ul> {
                this.searchResults.map(result => {
                    return <li onClick={this.onSelectSymbol.bind(this, result.symbol)}><strong> {result.symbol}</strong> - {result.name}</li>
                })
            }</ul>
        }
        return [
            <form onSubmit={this.onFindStock.bind(this)}>
                <input
                    id="stock-symbol"
                    ref={el => this.stockNameInput = el}
                    placeholder="Enter Stock Symbol" />
                <button type="submit">Find</button>
            </form>,
            <div>{dataContent}</div>,
        ];
    }
}