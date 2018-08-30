class Data {
    method: string;
    uri: string;
    version: string;
    message: string;
    response: undefined;
    fullfilled: boolean;

    constructor(method: string, uri: string, version: string, message: string) {
        this.method = method;
        this.uri = uri;
        this.version = version;
        this.message = message;
        this.response = undefined;
        this.fullfilled = false;
    }
}

let myData = new Data('Get', 'http://google.com', 'HTTP/1.1', 'OK');
console.log(myData);