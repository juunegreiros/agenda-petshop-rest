var restify = require('restify');

function ClientesClient() {
  this._cliente = restify.createJsonClient({
    url: 'https://api.myjson.com/bins/hcyn7'
  });
}

ClientesClient.prototype.lista = function (cliente, callback) {
  this._cliente.get('/', cliente, callback)
}

module.exports = function () {
  return ClientesClient
}
