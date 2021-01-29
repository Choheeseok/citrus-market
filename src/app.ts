import express from "express";
import nunjucks from "nunjucks";
import router from "./controllers";

class App {
  readonly app: express.Application;
  constructor() {
    this.app = express();
    this.setViewEngine();
    this.setStatic();
    this.setRoute();
  }

  setViewEngine() {
    nunjucks.configure("templetes", {
      autoescape: true,
      express: this.app,
    });
  }

  setStatic() {
    this.app.use("/static", express.static("static"));
  }

  setRoute() {
    this.app.use(router);
  }
}

export default new App().app;
