import { useState } from 'react';
import data from '../assets/data/questions';
import { Body, Container, Res } from '../styles/trivial';

const Trivial = () => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);
        if (answer.isRight) {
            setCorrectAnswers(correctAnswers + 1);
        } else {
            alert('Respuesta Incorrecta!');
        }
    };

    const getNextQuestion = () => {
        if (questionIndex + 1 === data.length) {
            setGameOver(true);
        } else {
            setQuestionIndex(questionIndex + 1);
            setSelectedAnswer(null);
        }
    };

    const renderEndScreen = () => {
        return (
            <div>
                <h1>¡Felicidades, has ganado!</h1>

                <h2>Aquí están todas las preguntas y respuestas:</h2>

                {data.map((question, index) => (
                    <div key={index}>
                        <h3>{question.question}</h3>
                        <p>Respuesta correcta: {question.answers.find(a => a.isRight).txt}</p>
                    </div>
                ))}

            </div>
        );
    };



    return (
        <Body>
            {!gameOver && questionIndex < data.length && (
                <>
                    <Container>
                        <h2>{data[questionIndex].question}</h2>
                        <img src={data[questionIndex].img} alt={data[questionIndex].question} />
                        {data[questionIndex].answers.map((answer) => (
                            <button
                                key={answer.txt}
                                onClick={() => handleAnswerClick(answer)}
                            >
                                {answer.txt}
                            </button>
                        ))}
                    </Container>
                    <Res>
                        {selectedAnswer && (
                            <>
                                <p>Respuesta correcta: {data[questionIndex].answers.find(a => a.isRight).txt}</p>
                                <p>Tu respuesta: {selectedAnswer.txt}</p>
                                {selectedAnswer.isRight ? (
                                    <p>¡Correcto!</p>
                                ) : (
                                    <p>¡Incorrecto!</p>
                                )}
                                <button onClick={getNextQuestion}>Siguiente</button>
                            </>
                        )}
                    </Res>
                </>
            )}

            {gameOver && renderEndScreen()}
        </Body>
    );
};

export default Trivial;
