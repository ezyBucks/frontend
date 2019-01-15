import passport from 'passport';

export default class Service {
    public path: string;
    public method: string;
    public func: string;

    /**
     * Getter for middleware. If middleware is empty it will return the
     * Authenticate middleware.
     */
    public get middleware(): any[] {
        if (!this.mid.length) {
            return [
                passport.authenticate('jwt', {
                    session: false
                })
            ];
        }
        return this.mid;
    }

    /**
     * Hold our middleware to be returned in getter
     */
    protected readonly mid: any;

    constructor(method: string, path: string, func: string, mid?: any[]) {
        this.method = method;
        this.path = path;
        this.mid = mid || [];
        this.func = func;
    }
}
