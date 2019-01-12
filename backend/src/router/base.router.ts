import express, { Application } from 'express';

// https://hackernoon.com/object-oriented-routing-in-nodejs-and-express-71cb1baed9f0
// Implemented the idea from the above post
class Router {
    private app: any;
    private routerPath: string;

    /**
     * Default constructor that builds all of the routing
     *
     * @param routerPath Base path for all of the routes
     * @param app Express
     */
    constructor(routerPath: string, app: Application) {
        if (app == null) {
            throw new Error('Missing required App');
        }

        this.app = app;
        this.routerPath = routerPath;

        this.registerServices();
    }

    /**
     * Return dictionary from inheriting class
     * specifying the route name and function
     */
    get services(): any {
        return {};
    }

    get middleware(): any {
        return null;
    }

    // registerRoutes function simply iterate over services property getting the verb, the path
    // and the function and register it along with the base path of the route.
    public registerServices() {
        const routerServices = this.services;

        Object.keys(routerServices).forEach((fullPath: string) => {
            // This is the name of the JS function which implement the service's logic
            const service: any = routerServices[fullPath];
            const pathItems = fullPath.split(' ');

            // if not specified, GET HTTP METHOD is used
            const verb = (pathItems.length > 1
                ? pathItems[0]
                : 'get'
            ).toLowerCase();

            // the new path is the base path plus the service's specific path
            const path =
                this.routerPath +
                (pathItems.length > 1 ? pathItems[1] : fullPath);

            // Check if the method has any middleware
            if (this.middleware) {
                this.app[verb](
                    path,
                    ...this.middleware,
                    (this as any)[service].bind(this)
                );
            } else {
                // bind to Express's router logic
                this.app[verb](path, (this as any)[service].bind(this));
            }
        });
    }
}

export default Router;
