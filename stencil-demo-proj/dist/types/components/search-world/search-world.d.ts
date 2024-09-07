import { EventEmitter } from "../../stencil-public-runtime";
export declare class SearchWorld {
    searchText: string;
    searchResult: {
        name: string;
        marketOpen: string;
    }[];
    userInput: string;
    searchFromAPI(): void;
    searchWorldNameSelected: EventEmitter<string>;
    onRowClick(name: string): void;
    onUserInput(event: Event): void;
    render(): string;
}
