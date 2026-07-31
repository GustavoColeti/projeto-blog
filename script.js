// Banco de dados em memória para as reações
const reactionsData = {
  force: { likes: 0, dislikes: 0 },
  jedi: { likes: 0, dislikes: 0 },
  sith: { likes: 0, dislikes: 0 },
  empire: { likes: 0, dislikes: 0 },
  mandalore: { likes: 0, dislikes: 0 }
};

// Função para trocar o texto/artigo exibido ao clicar nos cards
function selectTopic(event, topicId) {
  // Oculta todos os textos
  const articles = document.querySelectorAll('.content-display .article-content');
  articles.forEach(article => article.classList.remove('active'));

  // Remove o efeito ativo de todos os cards superiores
  const cards = document.querySelectorAll('.cards-grid .card');
  cards.forEach(card => card.classList.remove('active'));

  // Ativa o artigo correspondente ao clique
  const selectedArticle = document.getElementById(topicId);
  if (selectedArticle) {
    selectedArticle.classList.add('active');
  }

  // Adiciona o destaque visual ao card clicado
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }
}

// Função de Like/Dislike
function addReaction(topicId, type) {
  if (reactionsData[topicId]) {
    reactionsData[topicId][type]++;
    const element = document.getElementById(`${type}-${topicId}`);
    if (element) {
      element.textContent = reactionsData[topicId][type];
    }
  }
}

// Inicialização de Eventos
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Alternar Tema (Modo Claro / Modo Escuro) com LocalStorage
  const themeBtn = document.getElementById('theme-btn');
  const savedTheme = localStorage.getItem('holocron-theme');

  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    updateThemeBtnUI(true);
  }

  themeBtn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    localStorage.setItem('holocron-theme', isLight ? 'light' : 'dark');
    updateThemeBtnUI(isLight);
  });

  function updateThemeBtnUI(isLight) {
    if (isLight) {
      themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i> <span>Modo Claro</span>';
    } else {
      themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i> <span>Modo Escuro</span>';
    }
  }

  // 2. Gerador de Neve para Modo Claro
  createSnowflakes();

  function createSnowflakes() {
    const snowContainer = document.getElementById('snow-container');
    const snowCount = 40;
    
    for (let i = 0; i < snowCount; i++) {
      const flake = document.createElement('div');
      flake.classList.add('snowflake');
      
      const size = Math.random() * 5 + 2 + 'px';
      flake.style.width = size;
      flake.style.height = size;
      flake.style.left = Math.random() * 100 + 'vw';
      flake.style.animationDuration = Math.random() * 3 + 2 + 's';
      flake.style.animationDelay = Math.random() * 2 + 's';
      
      snowContainer.appendChild(flake);
    }
  }

  // 3. Barra de Progresso de Leitura & Botão Voltar ao Topo
  const progressBar = document.getElementById('reading-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;

    if (window.scrollY > 300) {
      backToTopBtn.style.display = 'flex';
    } else {
      backToTopBtn.style.display = 'none';
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 4. Menu Responsivo Mobile
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');

  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
  });

  // 5. Pesquisa em Tempo Real
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.article-card');

    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (text.includes(term)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });

  // 6. Filtro por Categorias
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');
      const cards = document.querySelectorAll('.article-card');

      cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 7. Link de Contato Exemplo
  document.getElementById('contact-link').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Frequência de comunicação estabelecida. Envie sua transmissão para gustavo@fandom-starwars.com');
  });
});