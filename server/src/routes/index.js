import customerRouter from "./customer";
import authtomerRouter from "./auth";
import bookRouter from "./book";
import commentRouter from "./comment";
import categoryRouter from "./category";

let route = (app) => {
  app.use("/category", categoryRouter);
  app.use("/comment", commentRouter);
  app.use("/customer", customerRouter);
  app.use("/book", bookRouter);
  app.use("/auth", authtomerRouter);
};
module.exports = { route };
