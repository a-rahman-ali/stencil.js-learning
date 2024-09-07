import { r as registerInstance, a as createEvent, h } from './index-dc0b858a.js';

const API_KEY = 'demo';
const API_KEY1 = '865I8ZLN51M0ZVJY';

const searchWorldCss = ".main-search-div{font-family:\"system-ui\";width:300px;margin:50px;padding:20px;border-radius:10%;border:2px solid #ccc;display:inline-block}.my-input-textbox{width:100%;padding:12px 20px;margin:8px 0;display:inline-block;border:1px solid #ccc;border-radius:4px;box-sizing:border-box}#api-table{font-family:Arial, Helvetica, sans-serif;border-collapse:collapse;width:100%}#api-table td,#api-table th{border:1px solid #ddd;padding:8px}#api-table tr:nth-child(even){background-color:#f2f2f2}#api-table tr:hover{background-color:#ddd}#api-table tr{cursor:pointer}#api-table th{padding-top:12px;padding-bottom:12px;text-align:left;background-color:#4CAF50;color:white}";

const SearchWorld = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.searchWorldNameSelected = createEvent(this, "searchWorldNameSelected", 7);
        this.searchText = undefined;
        this.searchResult = [];
        this.userInput = '';
    }
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
                };
            });
            console.log(this.searchResult);
        });
    }
    onRowClick(name) {
        console.log(name);
        this.searchWorldNameSelected.emit(name);
    }
    onUserInput(event) {
        event.preventDefault();
        this.userInput = event.target.value;
        this.searchText = this.userInput;
    }
    render() {
        let searchWorldComponent = '';
        searchWorldComponent = (h("div", { key: 'b4549dc6b974c653297d38a6a014a88445a84928', class: "main-search-div" }, h("input", { key: 'f24548204a021bce302655867466a4ebebc94d5e', class: "my-input-textbox", type: "text", value: this.searchText, onInput: this.onUserInput.bind(this) }), h("button", { key: '8e5851c10cbd3e8c5a5548ddf32442eb3f441f01', class: "btn-react", onClick: this.searchFromAPI.bind(this) }, "Search it!"), h("hr", { key: '9698c27b81a4dca556cae738b896cc1c7026516e' }), h("br", { key: '3d0297efcaa3c14d4b4324b15eef4ec9b8affd33' }), " ", h("br", { key: '63365f4fbe85132096373659dd740f05859935e1' }), h("table", { key: 'aeaabb87c35983b12965e69ec4fd0497b5ca300f', id: "api-table" }, this.searchResult.map(r => (h("tr", null, h("tr", { onClick: this.onRowClick.bind(this, r.name) }, h("td", null, r.name), h("td", null, r.marketOpen))))))));
        return searchWorldComponent;
    }
};
SearchWorld.style = searchWorldCss;

export { SearchWorld as search_world };

//# sourceMappingURL=search-world.entry.js.map