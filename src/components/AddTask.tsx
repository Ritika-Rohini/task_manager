// src/components/AddTask.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { addTask } from '../store/taskSlice';
import { useTheme } from '../context/ThemeContext';

const Form = styled.form<{ $isDarkMode: boolean }>`
  display: flex;
  gap: 10px;
  margin: 20px 0;
  padding: 20px;
  background: ${props => props.$isDarkMode ? '#2c2c2c' : '#ffffff'};
  border-radius: 8px;
`;

const Input = styled.input<{ $isDarkMode: boolean }>`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: ${props => props.$isDarkMode ? '#3a3a3a' : '#ffffff'};
  color: ${props => props.$isDarkMode ? '#ffffff' : '#000000'};
`;

const Button = styled.button<{ $isDarkMode: boolean }>`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  background: ${props => props.$isDarkMode ? '#4a4a4a' : '#e0e0e0'};
  color: ${props => props.$isDarkMode ? '#ffffff' : '#000000'};
  cursor: pointer;

  &:hover {
    background: ${props => props.$isDarkMode ? '#5a5a5a' : '#d0d0d0'};
  }
`;

const AddTask: React.FC = () => {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const { isDarkMode } = useTheme();
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (title.trim()) {
        dispatch(addTask({
          id: uuidv4(),
          title: title.trim(),
          completed: false,
          createdAt: new Date(),
        }));
        setTitle('');
      }
    };
  
    return (
      <Form onSubmit={handleSubmit} $isDarkMode={isDarkMode}>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add new task..."
          $isDarkMode={isDarkMode}
        />
        <Button type="submit" $isDarkMode={isDarkMode}>
          Add Task
        </Button>
      </Form>
    );
  };

export default AddTask;
