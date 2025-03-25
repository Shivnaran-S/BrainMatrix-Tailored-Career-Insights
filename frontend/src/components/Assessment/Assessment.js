import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import QuestionCard from './QuestionCard';
import { Button, Container, Typography, Box, LinearProgress } from '@mui/material';

const Assessment = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await api.get('/questions/');
        setQuestions(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load questions');
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Submit all answers
      const responses = Object.entries(answers).map(([questionId, answer]) => ({
        question: questionId,
        answer: parseInt(answer, 10),
      }));
      
      await Promise.all(
        responses.map(response => 
          api.post('/responses/', response)
        )
      );
      
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to submit assessment');
    }
  };

  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Career Assessment ({currentQuestion + 1}/{questions.length})
        </Typography>
        
        {questions.length > 0 && (
          <QuestionCard
            question={questions[currentQuestion]}
            onAnswer={handleAnswer}
            selectedAnswer={answers[questions[currentQuestion].id]?.toString()}
          />
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            variant="outlined"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          
          {currentQuestion < questions.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!answers[questions[currentQuestion].id]}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={!answers[questions[currentQuestion].id]}
            >
              Submit Assessment
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Assessment;