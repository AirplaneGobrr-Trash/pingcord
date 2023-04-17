const { app, express, http, io, server } = require('./web')
const {create} = require('./combiner')
const combiner = create(app, io)

combiner.addRoute('/api/guilds/:id/getMembers', 'api::guilds::getMembers', null, (data, callback) => {
  console.log(data)
  callback(data)
})

combiner.addRoute('/api/guilds/:id/getMessages', 'api::guilds::getMessages', null, (data, callback) => {
  console.log(data)
  callback(data)
})

combiner.addRoute("/api/guilds/create", "api::guilds::create", null, (data, callback) => {
  console.log(data)
  callback(data)
})

app.get('/', (req, res) => {
  res.render("pingcord")
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});