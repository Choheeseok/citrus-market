import express from "express";
import bodyParser from "body-parser";
import nunjucks from "nunjucks";
import router from "./controllers";
import session from "express-session";

class App {
  readonly app: express.Application;
  constructor() {
    this.app = express();
    this.setViewEngine();
    this.setMiddleware();
    this.setStatic();
    this.setRoute();
  }

  setViewEngine() {
    nunjucks.configure("templetes", {
      autoescape: true,
      express: this.app,
    });
  }

  setMiddleware() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(
      session({
        secret: "this must be hidden asdfsadf",
        resave: false,
        saveUninitialized: true,
      })
    );
  }

  setStatic() {
    this.app.use("/static", express.static("static"));
  }

  setRoute() {
    this.app.use(router);
  }
}

export default new App().app;
