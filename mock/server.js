const jsonServer = require("json-server");
const auth = require("json-server-auth");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Active json-server-auth
server.db = router.db;

server.use(middlewares);
server.use(auth);
server.use(router);

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`JSON Server running on http://localhost:${PORT}`);
});