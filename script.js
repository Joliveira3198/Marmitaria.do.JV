
// Pedido
document.getElementById('form-pedido').addEventListener('submit', function(event) {
  event.preventDefault();
  const tamanho = document.getElementById('tamanho').value;
  const observacoes = document.getElementById('observacoes').value;
  const ingredientes = [...document.querySelectorAll('input[name=ingredientes]:checked')].map(el => el.value);
  localStorage.setItem('pedido', JSON.stringify({ tamanho, ingredientes, observacoes }));
  alert('Pedido adicionado ao carrinho!');
  document.getElementById('pagamento').classList.remove('hidden');
});

// Pagamento
function pagar(metodo) {
  alert('Pagamento via ' + metodo + ' simulado com sucesso!');
  document.getElementById('avaliacao').classList.remove('hidden');
}

// Avaliação
function enviarAvaliacao() {
  const nota = document.getElementById('nota').value;
  const comentario = document.getElementById('comentario').value;
  localStorage.setItem('avaliacao', JSON.stringify({ nota, comentario }));
  alert('Obrigado pela sua avaliação!');
}

// Chatbot
function enviarMensagem() {
  const input = document.getElementById('chat-input');
  const msg = input.value.trim();
  if (!msg) return;
  const chatWindow = document.getElementById('chat-window');
  chatWindow.innerHTML += "<div><strong>Você:</strong> " + msg + "</div>";
  let resposta = 'Não entendi. Pode repetir?';
  if (msg.includes('horário')) resposta = 'Funcionamos de segunda a sábado, das 10h às 14h.';
  if (msg.includes('pagamento')) resposta = 'Aceitamos Pix, cartão e boleto.';
  if (msg.includes('pedido')) resposta = 'Você pode acompanhar o status do seu pedido aqui no site.';
  chatWindow.innerHTML += "<div><strong>Bot:</strong> " + resposta + "</div>";
  chatWindow.scrollTop = chatWindow.scrollHeight;
  input.value = '';
}

// Painel Admin
const adminSenha = "1234";

function loginAdmin() {
  const senha = document.getElementById("admin-senha").value;
  if (senha === adminSenha) {
    document.getElementById("admin-login").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    atualizarDashboard();
  } else {
    alert("Senha incorreta.");
  }
}

function logoutAdmin() {
  document.getElementById("dashboard").classList.add("hidden");
  document.getElementById("admin-login").classList.remove("hidden");
}

function atualizarDashboard() {
  const pedido = JSON.parse(localStorage.getItem("pedido"));
  if (pedido) {
    document.getElementById("total-pedidos").innerText = "1";
    document.getElementById("ultimo-pedido").innerText = JSON.stringify(pedido);
  } else {
    document.getElementById("total-pedidos").innerText = "0";
    document.getElementById("ultimo-pedido").innerText = "Nenhum";
  }
}

document.addEventListener("keydown", (e) => {
  window._seq = (window._seq || "") + e.key;
  if (window._seq.includes("admin")) {
    document.getElementById("admin-login").classList.remove("hidden");
    window._seq = "";
  }
});
