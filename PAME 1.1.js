// ( PARTE DA DIVISÃO EM CLASSES )

class Usuario {
    constructor(id, nome, enderecoContato, historicoReservas) {
      this.id = id;
      this.nome = nome;
      this.enderecoContato = enderecoContato;
      this.historicoReservas = historicoReservas || [];
    }
  }
  
  class Propriedade {
    constructor(id, nome, endereco, capacidadeHospedes, numeroQuartos, precoPorNoite, disponibilidade) {
      this.id = id;
      this.nome = nome;
      this.endereco = endereco;
      this.capacidadeHospedes = capacidadeHospedes;
      this.numeroQuartos = numeroQuartos;
      this.precoPorNoite = precoPorNoite;
      this.disponibilidade = disponibilidade || true;
    }
  }
  
  class Reserva {
    constructor(id, idPropriedade, idUsuario, checkIn, checkOut, valorTotal, statusPagamento) {
      this.id = id;
      this.idPropriedade = idPropriedade;
      this.idUsuario = idUsuario;
      this.checkIn = checkIn;
      this.checkOut = checkOut;
      this.valorTotal = valorTotal;
      this.statusPagamento = statusPagamento || "Pendente";
    }
  }
  
  
  
    class Anuncio {
    constructor(id, idProprietario, idPropriedade, titulo, descricao, status) {
      this.id = id;
      this.idProprietario = idProprietario;
      this.idPropriedade = idPropriedade;
      this.titulo = titulo;
      this.descricao = descricao;
      this.status = status;
    }
  }
  
  class Sistema {
    constructor() {
      this.usuarios = [];
      this.propriedades = [];
      this.reservas = [];
      this.anuncios = []; // Adicionando uma lista de anúncios ao sistema
      this.usuarioLogado = null;
    
   // (PARTE DA DIVISÃO DAS FUNÇÕES )
    
   
    
  
    fazerLogin(nomeUsuario) {
      this.usuarioLogado = this.usuarios.find((user) => user.nome === nomeUsuario);
  
      if (this.usuarioLogado) {
        console.log(`Bem-vindo AO NOSSO APP DA PUSADA ECLIPSE SOLAR !`);
      } else {
        console.log("Usuário não encontrado.");
      }
    }
  
    // Função para cadastrar um novo usuário
    fazerCadastro(nomeUsuario, enderecoContato) {
      const novoUsuario = new Usuario(this.usuarios.length + 1, nomeUsuario, enderecoContato);
      this.usuarios.push(novoUsuario);
      this.usuarioLogado = novoUsuario;
      console.log("Cadastro concluído!");
    }
  
    // Função para visualizar os dados do usuário logado
    verMeusDados() {
      if (!this.usuarioLogado) {
        console.log("Nenhum usuário logado.");
        return;
      }
      console.log(`Meus Dados - ID: ${this.usuarioLogado.id}, Nome: ${this.usuarioLogado.nome}, Endereço de Contato: ${this.usuarioLogado.enderecoContato}`);
    }
  
    // Função para modificar os dados do usuário logado
    modificarMeusDados(novosDados) {
      if (!this.usuarioLogado) {
        console.log("Nenhum usuário logado.");
        return;
      }
  
      this.usuarioLogado.nome = novosDados.nome || this.usuarioLogado.nome;
      this.usuarioLogado.enderecoContato = novosDados.enderecoContato || this.usuarioLogado.enderecoContato;
      console.log("Dados modificados com sucesso!");
    }
  
    // Função para ver a lista de reservas em ordem cronológica
    verListaReservasOrdemCronologica() {
      if (this.reservas.length === 0) {
        console.log("Nenhuma reserva encontrada.");
        return;
      }
  
      const reservasOrdenadas = this.reservas.slice().sort((a, b) => new Date(a.checkIn) - new Date(b.checkIn));
      console.log("Lista de Reservas (Ordem Cronológica):");
      reservasOrdenadas.forEach((reserva) => {
        console.log(`ID: ${reserva.id}, Check-in: ${reserva.checkIn}, Check-out: ${reserva.checkOut}`);
      });
    }
  
    // Função para adicionar uma nova propriedade
    adicionarPropriedade(novaPropriedade) {
      this.propriedades.push(novaPropriedade);
      console.log("Propriedade adicionada com sucesso!");
    }
  
    // Função para excluir uma propriedade
    excluirPropriedade(idPropriedade) {
      const propriedadeSelecionada = this.propriedades.find((propriedade) => propriedade.id === idPropriedade);
  
      if (propriedadeSelecionada) {
        const reservasAssociadas = this.reservas.some((reserva) => reserva.idPropriedade === idPropriedade);
  
        if (reservasAssociadas) {
          console.log("Não é possível excluir a propriedade, pois há reservas associadas.");
        } else {
          this.propriedades = this.propriedades.filter((propriedade) => propriedade.id !== idPropriedade);
          this.anuncios = this.anuncios.filter((anuncio) => anuncio.idPropriedade !== idPropriedade);
          console.log("Propriedade e anúncios associados excluídos com sucesso.");
        }
      } else {
        console.log("Propriedade não encontrada.");
      }
    }
  
    // Função para fazer um anúncio
    fazerAnuncio(idPropriedade, titulo, descricao, status) {
      const novoAnuncio = new Anuncio(this.anuncios.length + 1, this.usuarioLogado.id, idPropriedade, titulo, descricao, status);
      this.anuncios.push(novoAnuncio);
      console.log("Anúncio criado com sucesso!");
    }
  
    // Função para excluir um anúncio
    excluirAnuncio(idAnuncio) {
      const anuncioSelecionado = this.anuncios.find((anuncio) => anuncio.id === idAnuncio);
  
      if (anuncioSelecionado) {
        this.anuncios = this.anuncios.filter((anuncio) => anuncio.id !== idAnuncio);
        console.log("Anúncio excluído com sucesso.");
      } else {
        console.log("Anúncio não encontrado.");
      }
    }
  
    // Função para avaliar uma estadia
    avaliarEstadia(idReserva, avaliacao) {
      const reserva = this.reservas.find((reserva) => reserva.id === idReserva);
  
      if (reserva) {
        reserva.avaliacao = avaliacao;
        console.log("Avaliação registrada com sucesso!");
      } else {
        console.log("Reserva não encontrada.");
      }
    }
  
    // Função para visualizar avaliações de uma propriedade
    visualizarAvaliacoes(idPropriedade) {
      const reservasPropriedade = this.reservas.filter((reserva) => reserva.idPropriedade === idPropriedade && reserva.avaliacao);
  
      if (reservasPropriedade.length > 0) {
        console.log("Avaliações para esta propriedade:");
        reservasPropriedade.forEach((reserva) => {
          console.log(`Reserva ID: ${reserva.id}, Avaliação: ${reserva.avaliacao}`);
        });
      } else {
        console.log("Nenhuma avaliação encontrada para esta propriedade.");
      }
    }
  
    // Função para ver a lista de anúncios
    verListaAnuncios() {
      console.log("Lista de anúncios:");
      this.anuncios.forEach((anuncio) => {
        console.log(`ID: ${anuncio.id}, Título: ${anuncio.titulo}, Descrição: ${anuncio.descricao}`);
      });
    }
  
    // Função para ver a lista de propriedades
    verListaPropriedades() {
      console.log("Lista de propriedades:");
      this.propriedades.forEach((propriedade) => {
        console.log(`ID: ${propriedade.id}, Nome: ${propriedade.nome}`);
      });
    }
  
    // Função para reservar uma propriedade
    reservarPropriedade(idPropriedade, checkIn, checkOut) {
      const propriedadeSelecionada = this.propriedades.find((propriedade) => propriedade.id === idPropriedade);
  
      if (propriedadeSelecionada) {
        const novaReserva = new Reserva(
          this.reservas.length + 1,
          propriedadeSelecionada.id,
          this.usuarioLogado.id,
          checkIn,
          checkOut,
          propriedadeSelecionada.precoPorNoite
        );
  
        this.reservas.push(novaReserva);
        console.log("Reserva realizada com sucesso!");
      } else {
        console.log("Propriedade não encontrada.");
      }
    }
  }
   
   
   
   //  (COMEÇANDO INTERAÇÃO COM O USUÁRIO)
   
   
   const readlineSync = require('readline-sync');
  
  console.log("Bem-vindo ao app da Pousada Eclipse!");
  
  const respostaCadastro = readlineSync.question("Você já possui cadastro? (sim ou não): ");
  
  if (respostaCadastro.toLowerCase() === "sim") {
    const nomeUsuario = readlineSync.question("Digite seu usuário: ");
    sistema.fazerLogin(nomeUsuario);
  
    if (!sistema.usuarioLogado) {
      console.log("Usuário não encontrado.");
    } else {
      console.log(`Bem-vindo de volta, ${nomeUsuario}!`);
    }
  } else if (respostaCadastro.toLowerCase() === "não") {
    const novoNomeUsuario = readlineSync.question("Digite um novo usuário: ");
    const enderecoContato = readlineSync.question("Digite seu endereço de contato: ");
  
    sistema.fazerCadastro(novoNomeUsuario, enderecoContato);
  
    console.log(`Cadastro concluído para ${novoNomeUsuario}!`);
  } else {
    console.log("Resposta inválida. Por favor, responda 'sim' ou 'não'.");
  }
  
  const opcao = parseInt(readlineSync.question("Escolha uma opção:\n1. Ver lista de propriedades\n2. Reservar propriedade"));
  
  if (opcao === 1) {
    sistema.verListaPropriedades();
  } else if (opcao === 2) {
    const idPropriedade = parseInt(readlineSync.question("Digite o ID da propriedade que deseja reservar:"));
    const checkIn = readlineSync.question("Digite a data de check-in (formato: YYYY-MM-DD):");
    const checkOut = readlineSync.question("Digite a data de check-out (formato: YYYY-MM-DD):");
    sistema.reservarPropriedade(idPropriedade, checkIn, checkOut);
  } else {
    console.log("Opção inválida.");
  }
    
   
   
   }
    
    