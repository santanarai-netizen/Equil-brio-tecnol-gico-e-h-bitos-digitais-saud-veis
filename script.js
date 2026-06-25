// ===== script.js =====
// Bem-estar digital · uso consciente
// Acessibilidade, quiz e interatividade

(function() {
    "use strict";

    // --- elementos DOM ---
    const container = document.getElementById('appContainer');
    const contrastBtn = document.getElementById('contrastBtn');
    const fontBtn = document.getElementById('fontBtn');
    const quizFeedback = document.getElementById('quizFeedback');
    const submitBtn = document.getElementById('submitQuiz');
    const options = document.querySelectorAll('input[name="quiz"]');

    // --- alternância de alto contraste ---
    contrastBtn.addEventListener('click', function() {
        document.body.classList.toggle('high-contrast');
        const isHighContrast = document.body.classList.contains('high-contrast');
        contrastBtn.innerHTML = isHighContrast ? 
            '<i class="fas fa-circle"></i> Contraste off' : 
            '<i class="fas fa-circle"></i> Contraste';
    });

    // --- aumento de fonte (toggle) ---
    fontBtn.addEventListener('click', function() {
        document.body.classList.toggle('font-large');
        const isLarge = document.body.classList.contains('font-large');
        fontBtn.innerHTML = isLarge ? 
            '<i class="fas fa-font"></i> Fonte normal' : 
            '<i class="fas fa-font"></i> Fonte +';
    });

    // --- dados do quiz ---
    const questions = [
        {
            question: "Qual é a recomendação geral para pausas durante o uso de telas?",
            options: ["10 min a cada 2h", "5 min a cada 30 min", "15 min a cada 1h", "20 min a cada 3h"],
            correct: 1 // índice 1 = "5 min a cada 30 min"
        }
    ];

    let currentQuestionIndex = 0;

    // --- carregar pergunta ---
    function loadQuestion(index) {
        const q = questions[index];
        if (!q) return;
        document.getElementById('questionText').textContent = q.question;
        const labels = document.querySelectorAll('.options label');
        labels.forEach((label, i) => {
            const radio = label.querySelector('input[type="radio"]');
            if (radio) {
                radio.value = i;
                // Remove texto antigo e adiciona nova opção
                const textNode = label.childNodes[1];
                if (textNode) label.removeChild(textNode);
                label.appendChild(document.createTextNode(' ' + q.options[i]));
                radio.checked = false;
            }
        });
        quizFeedback.innerHTML = '👆 Escolha uma opção e clique em responder.';
        quizFeedback.style.background = '#e3f0e9';
    }

    // carregar primeira pergunta
    loadQuestion(currentQuestionIndex);

    // --- submit do quiz ---
    submitBtn.addEventListener('click', function() {
        const q = questions[currentQuestionIndex];
        let selectedValue = null;
        let selectedIndex = -1;
        options.forEach((opt, idx) => {
            if (opt.checked) {
                selectedValue = opt.value;
                selectedIndex = idx;
            }
        });

        if (selectedValue === null) {
            quizFeedback.innerHTML = '⚠️ Por favor, selecione uma alternativa.';
            quizFeedback.style.background = '#fce4e4';
            return;
        }

        const isCorrect = (parseInt(selectedValue) === q.correct);
        const correctText = q.options[q.correct];

        if (isCorrect) {
            quizFeedback.innerHTML = `✅ Correto! A resposta é "${correctText}". Muito bem! 🎉`;
            quizFeedback.style.background = '#c8f0d6';
        } else {
            quizFeedback.innerHTML = `❌ Não foi dessa vez. A resposta correta é "${correctText}". Tente novamente!`;
            quizFeedback.style.background = '#fce4e4';
        }

        // desmarca para próxima tentativa
        options.forEach(opt => opt.checked = false);
    });

    // --- acessibilidade extra: navegação por teclado ---
    document.querySelectorAll('button, input, .card').forEach(el => {
        el.setAttribute('tabindex', '0');
    });

    // --- mensagem no console ---
    console.log('🌿 Bem-estar digital · projeto acessível e responsivo');
})();
