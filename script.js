// Quiz Data
const quizData = [
    {
        question: "What type of electromagnetic radiation do thermal cameras detect?",
        options: [
            "Visible light",
            "Infrared radiation", 
            "Ultraviolet radiation",
            "X-rays"
        ],
        correct: 1,
        explanation: "Thermal cameras detect infrared radiation, which is emitted by all objects with temperatures above absolute zero."
    },
    {
        question: "What is the typical wavelength range for thermal imaging cameras?",
        options: [
            "0.4-0.7 micrometers",
            "1-3 micrometers",
            "7-14 micrometers",
            "20-30 micrometers"
        ],
        correct: 2,
        explanation: "Most thermal cameras operate in the long-wave infrared (LWIR) range of 7-14 micrometers."
    },
    {
        question: "According to the Stefan-Boltzmann Law, radiated power is proportional to temperature raised to what power?",
        options: [
            "Second power (T²)",
            "Third power (T³)",
            "Fourth power (T⁴)",
            "Fifth power (T⁵)"
        ],
        correct: 2,
        explanation: "The Stefan-Boltzmann Law states that radiated power is proportional to the fourth power of absolute temperature (T⁴)."
    },
    {
        question: "What is emissivity?",
        options: [
            "The speed at which heat travels through a material",
            "A measure of how efficiently an object emits thermal radiation",
            "The temperature at which a material melts",
            "The ability of a material to conduct electricity"
        ],
        correct: 1,
        explanation: "Emissivity is a material property that describes how efficiently an object emits thermal radiation compared to a perfect blackbody."
    },
    {
        question: "Which material typically has HIGH emissivity?",
        options: [
            "Polished aluminum",
            "Chrome plating",
            "Painted surfaces",
            "Shiny stainless steel"
        ],
        correct: 2,
        explanation: "Painted surfaces typically have high emissivity (0.8-0.95), while shiny metals have low emissivity."
    },
    {
        question: "What is a major advantage of thermal imaging for electrical inspections?",
        options: [
            "It can see through walls",
            "It works only on de-energized equipment",
            "It allows non-contact inspection of energized equipment",
            "It can detect voltage levels"
        ],
        correct: 2,
        explanation: "Thermal imaging allows safe, non-contact inspection of energized electrical equipment, reducing arc flash risks."
    },
    {
        question: "In industrial applications, what does a 'hot spot' in an electrical connection typically indicate?",
        options: [
            "Normal operation",
            "High resistance or loose connection",
            "Low voltage",
            "Good electrical contact"
        ],
        correct: 1,
        explanation: "Hot spots in electrical connections usually indicate high resistance due to loose connections, corrosion, or component degradation."
    },
    {
        question: "What is the primary benefit of preventive maintenance using thermal imaging?",
        options: [
            "Increased equipment temperatures",
            "Identifying problems before expensive failures occur",
            "Reducing equipment efficiency",
            "Increasing maintenance costs"
        ],
        correct: 1,
        explanation: "Thermal imaging enables preventive maintenance by identifying potential problems before they lead to costly equipment failures."
    },
    {
        question: "Which of the following is NOT a typical industrial application of thermal imaging?",
        options: [
            "Bearing temperature monitoring",
            "Electrical panel inspections",
            "Reading text documents",
            "Building energy audits"
        ],
        correct: 2,
        explanation: "Thermal imaging is used for temperature-related inspections and monitoring, not for reading text or documents."
    },
    {
        question: "What factors most influence the ROI of thermal imaging programs?",
        options: [
            "Only the cost of the thermal camera",
            "Facility size, equipment criticality, and program implementation quality",
            "The brand of thermal imaging equipment used",
            "The time of year inspections are performed"
        ],
        correct: 1,
        explanation: "ROI for thermal imaging programs depends heavily on facility size, equipment criticality, current maintenance practices, and how well the program is implemented and managed."
    }
];

// Quiz State
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let quizCompleted = false;

// DOM Elements
const quizStart = document.getElementById('quiz-start');
const quizQuestionsElement = document.getElementById('quiz-questions');
const quizResults = document.getElementById('quiz-results');
const startQuizBtn = document.getElementById('start-quiz-btn');
const nextQuestionBtn = document.getElementById('next-question-btn');
const restartQuizBtn = document.getElementById('restart-quiz-btn');
const questionText = document.getElementById('question-text');
const answerOptions = document.getElementById('answer-options');
const questionCounter = document.getElementById('question-counter');
const progressFill = document.getElementById('progress-fill');
const scoreDisplay = document.getElementById('score-display');
const resultsFeedback = document.getElementById('results-feedback');

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
    initializeNavigation();
    initializeScrollAnimations();
});

startQuizBtn.addEventListener('click', startQuiz);
nextQuestionBtn.addEventListener('click', nextQuestion);
restartQuizBtn.addEventListener('click', restartQuiz);

// Quiz Functions
function initializeQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    quizCompleted = false;
}

function startQuiz() {
    quizStart.style.display = 'none';
    quizQuestionsElement.style.display = 'block';
    showQuestion();
}

function showQuestion() {
    const question = quizData[currentQuestion];
    
    // Update progress
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressFill.style.width = progress + '%';
    questionCounter.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
    
    // Display question
    questionText.textContent = question.question;
    
    // Create answer options
    answerOptions.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'answer-option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectAnswer(index));
        answerOptions.appendChild(optionElement);
    });
    
    // Hide next button initially
    nextQuestionBtn.style.display = 'none';
    selectedAnswer = null;
}

function selectAnswer(answerIndex) {
    if (selectedAnswer !== null) return; // Prevent changing answer
    
    selectedAnswer = answerIndex;
    const question = quizData[currentQuestion];
    const options = answerOptions.querySelectorAll('.answer-option');
    
    // Mark selected answer
    options[answerIndex].classList.add('selected');
    
    // Show correct/incorrect
    setTimeout(() => {
        options.forEach((option, index) => {
            if (index === question.correct) {
                option.classList.add('correct');
            } else if (index === answerIndex && index !== question.correct) {
                option.classList.add('incorrect');
            }
        });
        
        // Update score
        if (answerIndex === question.correct) {
            score++;
        }
        
        // Show explanation
        showExplanation(question.explanation);
        
        // Show next button
        nextQuestionBtn.style.display = 'block';
    }, 500);
}

function showExplanation(explanation) {
    const explanationElement = document.createElement('div');
    explanationElement.className = 'explanation';
    explanationElement.style.cssText = `
        background: #f8f9fa;
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1rem;
        border-left: 4px solid #667eea;
    `;
    explanationElement.innerHTML = `<strong>Explanation:</strong> ${explanation}`;
    answerOptions.appendChild(explanationElement);
}

function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizQuestionsElement.style.display = 'none';
    quizResults.style.display = 'block';
    
    const percentage = Math.round((score / quizData.length) * 100);
    
    // Create score display
    scoreDisplay.innerHTML = `
        <div class="score-circle">
            <div>${score}/${quizData.length}</div>
            <div style="font-size: 1rem; font-weight: 400;">${percentage}%</div>
        </div>
        <div class="score-text">You scored ${score} out of ${quizData.length} questions correctly!</div>
    `;
    
    // Provide feedback based on score
    let feedback = '';
    if (percentage >= 90) {
        feedback = `
            <h4>🎉 Excellent Work!</h4>
            <p>You have a strong understanding of thermal imaging fundamentals! You're ready to apply this knowledge in industrial settings. Consider exploring advanced thermal imaging techniques and specific industry applications.</p>
        `;
    } else if (percentage >= 70) {
        feedback = `
            <h4>👍 Good Job!</h4>
            <p>You have a solid grasp of thermal imaging basics. Review the areas where you missed questions, particularly focusing on the science behind thermal imaging and emissivity concepts.</p>
        `;
    } else if (percentage >= 50) {
        feedback = `
            <h4>📚 Keep Learning!</h4>
            <p>You're on the right track! Review the content again, especially the sections on electromagnetic spectrum, Stefan-Boltzmann Law, and industrial applications. Practice identifying different scenarios where thermal imaging provides value.</p>
        `;
    } else {
        feedback = `
            <h4>🔄 Time to Review!</h4>
            <p>Don't worry - thermal imaging is a complex topic! Go back through the guide and focus on understanding the basic principles: what thermal cameras detect, how they work, and why they're valuable in industrial settings.</p>
        `;
    }
    
    resultsFeedback.innerHTML = feedback;
}

function restartQuiz() {
    initializeQuiz();
    quizResults.style.display = 'none';
    quizStart.style.display = 'block';
}

// Navigation Functions
function initializeNavigation() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements and observe them
    const animatedElements = document.querySelectorAll('.section, .application-card, .benefit-category, .science-principle');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Utility Functions
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-primary') || e.target.classList.contains('btn-secondary')) {
        createRippleEffect(e.target, e);
    }
});

// Add CSS animation for ripple effect
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Dynamic thermal gradient animation
function animateThermalGradient() {
    const thermalGradients = document.querySelectorAll('.thermal-gradient');
    
    thermalGradients.forEach(gradient => {
        let hue = 0;
        setInterval(() => {
            hue = (hue + 1) % 360;
            gradient.style.background = `radial-gradient(circle at center, 
                hsl(${hue}, 100%, 50%) 0%, 
                hsl(${(hue + 60) % 360}, 100%, 50%) 25%, 
                hsl(${(hue + 120) % 360}, 100%, 50%) 50%, 
                hsl(${(hue + 180) % 360}, 100%, 50%) 75%, 
                hsl(${(hue + 240) % 360}, 100%, 50%) 100%)`;
        }, 100);
    });
}

// Initialize thermal animation when page loads
window.addEventListener('load', () => {
    setTimeout(animateThermalGradient, 1000);
});

// Add loading states
function showLoading(element) {
    element.classList.add('loading');
}

function hideLoading(element) {
    element.classList.remove('loading');
}

// Enhanced quiz feedback with detailed analysis
function generateDetailedFeedback() {
    const topicAreas = {
        'Basic Concepts': [0, 1, 3],
        'Scientific Principles': [2, 4],
        'Industrial Applications': [5, 6, 7, 8],
        'Business Value': [9]
    };
    
    const topicScores = {};
    
    Object.keys(topicAreas).forEach(topic => {
        const questionIndices = topicAreas[topic];
        let topicScore = 0;
        questionIndices.forEach(index => {
            // This would need to track individual question results
            // For now, we'll use overall score as approximation
        });
        topicScores[topic] = Math.round((score / quizData.length) * 100);
    });
    
    return topicScores;
}