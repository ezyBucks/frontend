import express, { Application } from 'express';

// https://hackernoon.com/object-oriented-routing-in-nodejs-and-express-71cb1baed9f0
// Implemented the idea from the above post
class Router {
    /**
     * Express application
     * Needs to any so we can jank in the register Services
     */
    private app: any;

    /**
     * The default path for all of the routes.
     */
    private routerPath: string;

    /**
     * Default constructor that builds all of the routing
     *
     * @param routerPath Base path for all of the routes
     * @param app Express
     */
    constructor(routerPath: string, app: Application) {
        if (app === null || app === undefined) {
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
    get services(): Services[] {
        return;
    }

    get middleware(): any {
        return;
    }

    /**
     * Iterate over all of the services(routes) listed in services array
     * and register it to the express app
     */
    public registerServices() {
        const routerServices = this.services;

        routerServices.forEach((service: Services) => {

            // the new path is the base path plus the service's specific path
            const path =
                this.routerPath +
                (pathItems.length > 1 ? pathItems[1] : fullPath);

            // Check if the method has any middleware
            if (this.middleware) {
                this.app[verb](
                    path,
                    ...this.middleware,
                    (this as any)[service.method].bind(this)
                );
            } else {
                // bind to Express's router logic
                this.app[verb](path, (this as any)[service.method].bind(this));
            }
        });
    }
}

export default Router;
