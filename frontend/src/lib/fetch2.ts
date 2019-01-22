class Fetch2 {
    protected options: RequestInit = { credentials: 'include', method: 'GET' };
    protected fetchUrl: string = '';

    public method(method: string) {
        this.options.method = method;
        return this;
    }

    public url(url: string) {
        this.fetchUrl = url;
        return this;
    }

    public send() {
        if (this.fetchUrl === undefined || this.fetchUrl === '') {
            throw new Error('Fetch needs to have a URL set');
        }

        return fetch(this.fetchUrl, this.options);
    }
}

export default Fetch2;
