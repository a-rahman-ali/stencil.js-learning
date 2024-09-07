import { Component, Event, EventEmitter, h, Prop, State } from "@stencil/core";
import { API_KEY } from "../API_KEY/api";
// import { API_KEY1 } from "../API_KEY/api";

@Component({
    tag: 'search-world',
    styleUrl: 'search-world.css',
    shadow: true
})
export class SearchWorld {
    @Prop({ mutable: true }) searchText: string;

    @State() searchResult: { name: string; marketOpen: string }[] = [];
    @State() userInput: string = '';

    searchFromAPI() {
        fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.searchText}&apikey=${API_KEY}`)
            .then(res => res.json())
            .then(parsedRes => {
                var metaData = parsedRes['bestMatches'];
                console.log(metaData);
                this.searchResult = metaData.map(match => {
                    return {
                        name: match['2. name'],
                        marketOpen: match['5. marketOpen']
                    }
                });
                console.log(this.searchResult);
            });
    }

    @Event({ bubbles: true, composed: true }) searchWorldNameSelected: EventEmitter<string>;

    onRowClick(name: string) {
        console.log(name);
        this.searchWorldNameSelected.emit(name);
    }

    onUserInput(event: Event) {
        event.preventDefault();
        this.userInput = (event.target as HTMLInputElement).value;
        this.searchText = this.userInput;
    }
    render() {
        let searchWorldComponent = '';
        searchWorldComponent = (
            <div class="main-search-div">
                <input class="my-input-textbox" type="text" value={this.searchText} onInput={this.onUserInput.bind(this)}></input>
                <button class="btn-react" onClick={this.searchFromAPI.bind(this)}>
                    Search it!
                </button>
                <hr></hr>
                <br></br> <br></br>

                <table id="api-table">
                    {this.searchResult.map(r => (
                        <tr>
                            <tr onClick={this.onRowClick.bind(this, r.name)}>
                                <td>{r.name}</td>
                                <td>{r.marketOpen}</td>
                            </tr>
                        </tr>
                    ))}
                </table>
            </div>
        );
        return searchWorldComponent;
    }
}