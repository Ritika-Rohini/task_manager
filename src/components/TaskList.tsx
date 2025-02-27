import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import styled from 'styled-components';
import { TaskState } from '../types/task';
import { deleteTask, toggleTask, reorderTasks } from '../store/taskSlice';
import { useTheme } from '../context/ThemeContext';

const TaskContainer = styled.div<{ isDarkMode: boolean }>`
  background: ${props => props.isDarkMode ? '#2c2c2c' : '#ffffff'};
  color: ${props => props.isDarkMode ? '#ffffff' : '#000000'};
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
`;

const TaskItem = styled.div<{ isDragging: boolean; completed: boolean }>`
  padding: 10px;
  margin: 8px 0;
  background: ${props => props.isDragging ? '#e0e0e0' : 'transparent'};
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
`;

const TaskList: React.FC = () => {
  const tasks = useSelector((state: { tasks: TaskState }) => state.tasks.tasks);
  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch(reorderTasks(items));
  };

  return (
    <TaskContainer isDarkMode={isDarkMode}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <TaskItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      isDragging={snapshot.isDragging}
                      completed={task.completed}
                    >
                      <span>{task.title}</span>
                      <div>
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => dispatch(toggleTask(task.id))}
                        />
                        <button onClick={() => dispatch(deleteTask(task.id))}>
                          Delete
                        </button>
                      </div>
                    </TaskItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </TaskContainer>
  );
};

export default TaskList;