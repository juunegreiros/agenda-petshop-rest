const Operations = require('../infraestrutura/operations')

const Clientes = new Operations('cliente')

module.exports = app => {
  app.get('/clientes', (req, res) => {
    Clientes.lista(res)
  })

  app.get('/clientes/cliente/:id', (req, res) => {
    const { id } = req.params

    Clientes.buscaPorId(res, id)
  })

  app.post('/clientes/cliente', (req, res) => {
    req.assert('nome',
      'Nome eh obrigatorio').notEmpty()
    req.assert('cpf',
      'CPF eh obrigatorio')
      .notEmpty()

    var erros = req.validationErrors()

    if (erros) {
      console.log('Erros de validacao encontrados')
      res.status(400).send(erros)
      return
    }
  
    const cliente = req.body

    Clientes.adiciona(res, cliente)
  })

  app.put('/clientes/cliente/:id', (req, res) => {
    const { id } = req.params
    const cliente = req.body

    Clientes.atualiza(res, cliente, id)
  })

  app.delete('/clientes/cliente/:id', (req, res) => {
    const { id } = req.params

    Clientes.deleta(res, id)
  })
}
