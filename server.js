import router ,{app} from "./routes/index.js";




app.use("/", router);

app.listen(7000, () => {
  console.log("Server listening on port 7000");
});
