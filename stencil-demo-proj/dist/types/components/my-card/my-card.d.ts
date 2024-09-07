export declare class MyCard {
    userName: string;
    APIData: string;
    showReactCard: boolean;
    showStencilCard: boolean;
    myStencilUsers: string;
    myReactUsers: string;
    onUserInput(event: Event): void;
    componentDidLoad(): void;
    getStencilUserFromAPI(): void;
    getReactUserFromAPI(): void;
    fetchMyDataFromAPI(contentType: string): void;
    onContentChange(content: string): void;
    searchWorldNameSelected(event: CustomEvent<string>): void;
    render(): any;
}
