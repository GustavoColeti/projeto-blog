// Banco de dados em memória para as reações
const reactionsData = {
  force: { likes: 0, dislikes: 0 },
  jedi: { likes: 0, dislikes: 0 },
  sith: { likes: 0, dislikes: 0 },
  empire: { likes: 0, dislikes: 0 },
  mandalore: { likes: 0, dislikes: 0 }
};

// Função para trocar o texto/artigo exibido ao clicar nos cards
function selectTopic(topicId) {
  // Oculta todos os textos
  const articles = document.querySelectorAll('.article-content');
  articles.forEach(article => article.classList.remove('active'));

  // Remove o efeito ativo de todos os cards superiores
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.classList.remove('active'));

  // Ativa o artigo correspondente ao clique
  const selectedArticle = document.getElementById(topicId);
  if (selectedArticle) {
    selectedArticle.classList.add('active');
  }

  // Adiciona o destaque visual ao card clicado
  event.currentTarget.classList.add('active');
}

// Função de Like/Dislike
function addReaction(topicId, type) {
  if (reactionsData[topicId]) {
    reactionsData[topicId][type]++;
    document.getElementById(`${type}-${topicId}`).textContent = reactionsData[topicId][type];
  }
}

// Alternar entre modo claro e escuro
const themeBtn = document.getElementById('theme-btn');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
});