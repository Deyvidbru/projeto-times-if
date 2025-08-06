const API_URL = 'https://6890ff94944bf437b597fb84.mockapi.io/times';

window.adicionarJogador = async function () {
  const jogador = {
    nome: document.getElementById("nome").value,
    numero: document.getElementById("numero").value,
    idade: document.getElementById("idade").value,
    nacionalidade: document.getElementById("nacionalidade").value,
    posicao: document.getElementById("posicao").value,
    clubeAnterior: document.getElementById("clubeAnterior").value,
  };

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(jogador)
  });

  alert("Jogador adicionado com sucesso!");
  listarJogadores();
};

window.listarJogadores = async function () {
  const res = await fetch(API_URL);
  const jogadores = await res.json();
  const lista = document.getElementById("listaJogadores");
  const resultadoBusca = document.getElementById("resultadoBusca");
  resultadoBusca.innerHTML = "";
  
  lista.innerHTML = jogadores.length === 0 
    ? "<p>Sem jogadores cadastrados.</p>" 
    : jogadores.map(j => `
      <div class="jogador">
        <strong>${j.nome}</strong> (#${j.numero})<br/>
        Idade: ${j.idade}, Nacionalidade: ${j.nacionalidade}<br/>
        Posição: ${j.posicao}<br/>
        Ex-clube: ${j.clubeAnterior}
      </div>`).join("");
};

window.buscarJogador = async function () {
  const nomeBusca = document.getElementById("buscaNome").value.toLowerCase();
  const res = await fetch(API_URL);
  const jogadores = await res.json();
  const jogador = jogadores.find(j => j.nome.toLowerCase() === nomeBusca);
  
  const div = document.getElementById("resultadoBusca");
  const lista = document.getElementById("listaJogadores");
  lista.innerHTML = "";

  div.innerHTML = jogador
    ? `<div class="jogador">
        <strong>${jogador.nome}</strong> (#${jogador.numero})<br/>
        Idade: ${jogador.idade}, Nacionalidade: ${jogador.nacionalidade}<br/>
        Posição: ${jogador.posicao}<br/>
        Ex-clube: ${jogador.clubeAnterior}
      </div>`
    : `<p>Jogador não encontrado.</p>`;
};

window.editarJogador = async function () {
  const nome = document.getElementById("editarNome").value.toLowerCase();
  const res = await fetch(API_URL);
  const jogadores = await res.json();
  const jogador = jogadores.find(j => j.nome.toLowerCase() === nome);

  if (!jogador) {
    alert("Jogador não encontrado.");
    return;
  }

  const novoJogador = {
    nome: document.getElementById("novoNome").value || jogador.nome,
    numero: document.getElementById("novoNumero").value || jogador.numero,
    idade: document.getElementById("novaIdade").value || jogador.idade,
    nacionalidade: document.getElementById("novaNacionalidade").value || jogador.nacionalidade,
    posicao: document.getElementById("novaPosicao").value || jogador.posicao,
    clubeAnterior: document.getElementById("novoClube").value || jogador.clubeAnterior,
  };

  await fetch(`${API_URL}/${jogador.id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(novoJogador)
  });

  alert("Jogador atualizado com sucesso!");
  listarJogadores();
};

window.deletarJogador = async function () {
  const nome = document.getElementById("removerNome").value.toLowerCase();
  const res = await fetch(API_URL);
  const jogadores = await res.json();
  const jogador = jogadores.find(j => j.nome.toLowerCase() === nome);

  if (!jogador) {
    alert("Jogador não encontrado.");
    return;
  }

  await fetch(`${API_URL}/${jogador.id}`, { method: 'DELETE' });
  alert("Jogador removido com sucesso!");
  listarJogadores();
};
