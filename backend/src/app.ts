import express from 'express';
import { Connection, createConnection } from 'typeorm';

class App {
    protected app: Express.Application;

    constructor() {
        this.app = express();
    }
}
