import express from "express";
import bodyParser from "body-parser";
import nunjucks from "nunjucks";
import router from "./controllers";
import session from "express-session";
import mongoose from "mongoose";

class App {
  readonly app: express.Application;
  constructor() {
    this.app = express();
    this.connectDB();
    this.setViewEngine();
    this.setMiddleware();
    this.setStatic();
    this.setRoute();
  }

  connectDB() {
    mongoose.Promise = global.Promise;

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error : "));
    db.once("open", () => {
      console.log("MongoDB connected");
    });

    mongoose.connect("mongodb://127.0.0.1/citrus-market", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  setViewEngine() {
    nunjucks.configure("templetes", {
      autoescape: true,
      express: this.app,
    });
  }

  setMiddleware() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.raw({ type: "image/*", limit: "10mb" }));
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
    this.app.use("/uploads", express.static("uploads"));
  }

  setRoute() {
    this.app.use(router);
  }
}

export default new App().app;
