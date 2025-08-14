// 1. Saudação ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    // Saudação personalizada baseada no horário
    const hour = new Date().getHours();
    let greeting;
    
    if (hour < 12) greeting = "Bom dia";
    else if (hour < 18) greeting = "Boa tarde";
    else greeting = "Boa noite";
    
    alert(`${greeting}! Bem-vindo ao meu currículo interativo.`);
    
    // Inicializa o contador de visitas
    updateVisitCounter();
    
    // Mostra data da última visita
    showLastVisit();
});

// 2. Botão para mudar o tema
const changeThemeBtn = document.getElementById('changeThemeBtn');
changeThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    // Altera o texto do botão conforme o tema
    if (document.body.classList.contains('dark-theme')) {
        changeThemeBtn.textContent = 'Tema Claro';
    } else {
        changeThemeBtn.textContent = 'Tema Escuro';
    }
});

// 3. Adicionar nova habilidade
const addSkillBtn = document.getElementById('addSkillBtn');
const skillsList = document.getElementById('skillsList');

addSkillBtn.addEventListener('click', () => {
    const newSkill = prompt('Digite uma nova habilidade:');
    if (newSkill && newSkill.trim() !== '') {
        const li = document.createElement('li');
        li.textContent = newSkill;
        skillsList.appendChild(li);
    }
});

// 4. Ordenar habilidades alfabeticamente
const sortSkillsBtn = document.getElementById('sortSkillsBtn');
sortSkillsBtn.addEventListener('click', () => {
    const skills = Array.from(skillsList.children);
    
    skills.sort((a, b) => {
        const textA = a.textContent.toUpperCase();
        const textB = b.textContent.toUpperCase();
        return textA.localeCompare(textB);
    });
    
    // Remove todos os itens
    while (skillsList.firstChild) {
        skillsList.removeChild(skillsList.firstChild);
    }
    
    // Adiciona os itens ordenados
    skills.forEach(skill => {
        skillsList.appendChild(skill);
    });
});

// 5. Atualizar idade automaticamente
const updateAgeBtn = document.getElementById('updateAgeBtn');
const ageElement = document.getElementById('age');

updateAgeBtn.addEventListener('click', () => {
    const birthDate = new Date(2003, 9, 31); // 31/10/2003
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    ageElement.textContent = age;
    alert(`Idade atualizada para ${age} anos!`);
});

// 6. Formulário de contato
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (name && email && message) {
        formMessage.textContent = `Obrigado, ${name}! Sua mensagem foi recebida. Entrarei em contato pelo e-mail ${email}.`;
        formMessage.style.backgroundColor = '#d4edda';
        formMessage.style.color = '#155724';
        formMessage.style.display = 'block';
        
        // Limpa o formulário
        contactForm.reset();
        
        // Salva o contato no localStorage (simulação)
        saveContact(name, email, message);
    } else {
        formMessage.textContent = 'Por favor, preencha todos os campos.';
        formMessage.style.backgroundColor = '#f8d7da';
        formMessage.style.color = '#721c24';
        formMessage.style.display = 'block';
    }
});

function saveContact(name, email, message) {
    const contact = {
        name,
        email,
        message,
        date: new Date().toISOString()
    };
    
    // Simulação de salvamento - na prática você enviaria para um servidor
    console.log('Contato salvo:', contact);
    localStorage.setItem('lastContact', JSON.stringify(contact));
}

// 7. Contador de visitas com localStorage
function updateVisitCounter() {
    let visitCount = localStorage.getItem('visitCount');
    
    if (!visitCount) {
        visitCount = 1;
    } else {
        visitCount = parseInt(visitCount) + 1;
    }
    
    localStorage.setItem('visitCount', visitCount);
    document.getElementById('visitCounter').textContent = `Visitas: ${visitCount}`;
}

// 8. Mostrar data da última visita
function showLastVisit() {
    const lastVisit = localStorage.getItem('lastVisitDate');
    const now = new Date();
    
    if (lastVisit) {
        const lastDate = new Date(lastVisit);
        const diffDays = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));
        
        let message;
        if (diffDays === 0) {
            message = "Você já visitou hoje!";
        } else if (diffDays === 1) {
            message = "Sua última visita foi ontem";
        } else {
            message = `Sua última visita foi há ${diffDays} dias`;
        }
        
        document.getElementById('lastVisit').textContent = message;
    } else {
        document.getElementById('lastVisit').textContent = "Esta é sua primeira visita!";
    }
    
    // Atualiza a data da última visita
    localStorage.setItem('lastVisitDate', now.toISOString());
}