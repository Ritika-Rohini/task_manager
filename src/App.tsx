// src/App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import styled from 'styled-components';
import taskReducer from './store/taskSlice';
import { ThemeProvider } from './context/ThemeContext';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import { useTheme } from './context/ThemeContext';

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

const AppContainer = styled.div<{ $isDarkMode: boolean }>`
  min-height: 100vh;
  background: ${props => props.$isDarkMode ? '#1a1a1a' : '#f5f5f5'};
  padding: 20px;
`;

const ThemeToggle = styled.button<{ $isDarkMode: boolean }>`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px;
  border-radius: 4px;
  background: ${props => props.$isDarkMode ? '#4a4a4a' : '#ffffff'};
  color: ${props => props.$isDarkMode ? '#ffffff' : '#000000'};
`;

const App: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppContainer $isDarkMode={isDarkMode}>
          <ThemeToggle onClick={toggleTheme} $isDarkMode={isDarkMode}>
            {isDarkMode ? '☀️' : '🌙'}
          </ThemeToggle>
          <h1>Task Manager</h1>
          <AddTask />
          <TaskList />
        </AppContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default App;

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
