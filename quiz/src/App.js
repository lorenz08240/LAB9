import React, { useState } from 'react';
import './App.css';
import lowScoreSound from './sounds/low-score.mp3';

const quizData = [
    { question: 'What is the capital of France?', options: ['Berlin', 'Madrid', 'Paris', 'Rome'], correctAnswer: 'Paris' },
    { question: 'What is the largest planet in our solar system?', options: ['Earth', 'Mars', 'Jupiter', 'Saturn'], correctAnswer: 'Jupiter' },
    { question: 'What is the chemical symbol for water?', options: ['H2O', 'O2', 'CO2', 'NaCl'], correctAnswer: 'H2O' }
];

function App() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswerClick = (selectedAnswer) => {
        if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }
        if (currentQuestion < quizData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Check the score and play the low-score sound if necessary
            if (score + (selectedAnswer === quizData[currentQuestion].correctAnswer ? 1 : 0) <= 2) {
                const lowScoreAudio = new Audio(lowScoreSound);
                lowScoreAudio.play();
            }
            setShowResult(true);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setShowResult(false);
        setScore(0);
    };

    return (
        <div className="app">
            <div className="container">
                <h1 className='quiz-app-head'>Quiz App</h1>
                {showResult ? (
                    <div className="result">
                        <p>Your score: {score} out of {quizData.length}</p>
                        <button onClick={restartQuiz}>Restart Quiz</button>
                    </div>
                ) : (
                    <>
                        <div className="question">
                            <p>{quizData[currentQuestion].question}</p>
                        </div>
                        <div className="options">
                            {quizData[currentQuestion].options.map((option, index) => (
                                <button 
                                    key={`${quizData[currentQuestion].question}-${option}`} 
                                    className="option" 
                                    onClick={() => handleAnswerClick(option)} 
                                    onKeyPress={(e) => e.key === 'Enter' && handleAnswerClick(option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
        
    );
}

export default App;