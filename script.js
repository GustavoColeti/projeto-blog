// Armazenamento simples de curtidas na memória
const votes = {
  post1: { likes: 0, dislikes: 0 },
  post2: { likes: 0, dislikes: 0 }
};

// Alternar entre Tema Claro e Escuro
const themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  
  if (document.body.classList.contains('dark-mode')) {
    themeToggleBtn.textContent = '☀️ Modo Claro';
  } else {
    themeToggleBtn.textContent = '🌙 Modo Escuro';
  }
});

// Selecionar Artigo Visível
function selectArticle(articleId) {
  const articles = document.querySelectorAll('.post');
  articles.forEach(article => article.classList.remove('active'));
  
  const selectedArticle = document.getElementById(articleId);
  if (selectedArticle) {
    selectedArticle.classList.add('active');
  }
}

// Funções de Like e Dislike
function like(postId) {
  votes[postId].likes++;
  document.getElementById(`likes-${postId}`).textContent = votes[postId].likes;
}

function dislike(postId) {
  votes[postId].dislikes++;
  document.getElementById(`dislikes-${postId}`).textContent = votes[postId].dislikes;
}