class Tabelas {
  init(conexao) {
    this.conexao = conexao
    this.criaClientes()
    this.criaPets()
    this.criaServicos()
    this.criaAtendimentos()
    this.populaTabelas()

    console.log('tabelas criadas!')
  }

  criaClientes() {
    const sql = 'CREATE TABLE IF NOT EXISTS Clientes (id int NOT NULL AUTO_INCREMENT, nome varchar(150) NOT NULL, cpf char(11) NOT NULL, PRIMARY KEY (id));'

    this.criaTabela(sql)
  }

  criaPets() {
    const sql = 'CREATE TABLE IF NOT EXISTS Pets (id int NOT NULL AUTO_INCREMENT, nome varchar(150), donoId int, tipo varchar(100), observacoes text, PRIMARY KEY (id), FOREIGN KEY (donoId) references Clientes(id))'

    this.criaTabela(sql)
  }

  criaServicos() {
    const sql = 'CREATE TABLE IF NOT EXISTS Servicos (id int NOT NULL AUTO_INCREMENT, nome varchar(150), preco decimal(5,2), descricao text, PRIMARY KEY (id))'

    this.criaTabela(sql)
  }

  criaAtendimentos() {
    const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, clienteId int, petId int, servicoId int, data datetime, status varchar(100), observacoes text, PRIMARY KEY(id), FOREIGN KEY (clienteId) references Clientes(id), FOREIGN KEY (petId) references Pets(id), FOREIGN KEY (servicoId) references Servicos(id))'

    this.criaTabela(sql)
  }

  populaTabelas() {
    this.insereClientes()
    this.inserePets()
  }

  inserePets() {
    const sql = `INSERT INTO Pets (nome, donoId, tipo, observacoes) VALUES ('teste', 1, 'animal de teste', 'observação teste')`

    this.criaTabela(sql)
  }
  
  insereClientes() {
    const sql = `INSERT INTO Clientes (nome, cpf) VALUES ('teste', '12345678910')`
    this.criaTabela(sql)
  }
  criaTabela(sql) {
    this.conexao.query(sql, erro => {
      if(erro) {
        console.log(erro)
      }
    })
  }
}



module.exports = new Tabelas
