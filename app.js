import app from "./src/config/server";

let port = 9090;

app.listen(port, () => {
  console.log(`Online at port ${port}`);
});
