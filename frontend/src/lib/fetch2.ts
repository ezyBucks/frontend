class Fetch2 {
    protected options: RequestInit = { credentials: 'include', method: 'GET' };
    protected fetchUrl: string = '';
    protected sendData:any = {};
    protected notFoundCallback: () => void = () => void;

    public method(method: string): Fetch2 {
        this.options.method = method.toUpperCase();
        return this;
    }

    public url(url: string): Fetch2 {
        this.fetchUrl = url;
        return this;
    }

    public send(): Promise<Response> {
        if (this.fetchUrl === undefined || this.fetchUrl === '') {
            throw new Error('Fetch needs to have a URL set');
        }

        this.options.body = JSON.stringify(this.sendData);

        return fetch(this.fetchUrl, this.options);
    }

    public data(data: any): Fetch2 {
        this.sendData = data;
        return this;
    }

    public handleErrors() {

    }

    public handleBadRequest() {

    }

    protected notFound(res: Response) {                                                                                                                                                                                                                                                                                                                                                                                                     
        if(res.status == 404) {
            this.notFoundCallback();
        }
    }
}

export default Fetch2;
