import React from 'react';
import { Box, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const QuestionCard = ({ question, onAnswer, selectedAnswer }) => {
  const handleAnswerChange = (e) => {
    onAnswer(question.id, e.target.value);
  };

  return (
    <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>{question.text}</Typography>
      <RadioGroup
        name={`question-${question.id}`}
        value={selectedAnswer}
        onChange={handleAnswerChange}
      >
        <FormControlLabel value="1" control={<Radio />} label="Strongly Disagree" />
        <FormControlLabel value="2" control={<Radio />} label="Disagree" />
        <FormControlLabel value="3" control={<Radio />} label="Neutral" />
        <FormControlLabel value="4" control={<Radio />} label="Agree" />
        <FormControlLabel value="5" control={<Radio />} label="Strongly Agree" />
      </RadioGroup>
    </Box>
  );
};

export default QuestionCard;