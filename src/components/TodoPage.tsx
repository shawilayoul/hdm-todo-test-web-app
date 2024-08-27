/**
 * @todo YOU HAVE TO IMPLEMENT THE DELETE AND SAVE TASK ENDPOINT, A TASK CANNOT BE UPDATED IF THE TASK NAME DID NOT CHANGE, YOU'VE TO CONTROL THE BUTTON STATE ACCORDINGLY
 */
import { useNavigate } from 'react-router-dom';
import UpdateTaskForm from './UpdateTaskForm.tsx';
import { Check, Delete, Edit } from '@mui/icons-material';
import {
  Box, Button, Container, IconButton, TextField, Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';


const TodoPage = () => {
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState<string>('');
  const handleFetchTasks = async () => setTasks(await api.get('/tasks'));
  const navigate = useNavigate()

  const handleDelete = async (id: number) => {
    // @todo IMPLEMENT HERE : DELETE THE TASK & REFRESH ALL THE TASKS, DON'T FORGET TO ATTACH THE FUNCTION TO THE APPROPRIATE BUTTON
    try {
      await api.delete(`/tasks/${id}`);
      toast.success('task has been deleted successfully');
      handleFetchTasks(); // Refresh the task list after deletion
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  const handleSave = async () => {
    // @todo IMPLEMENT HERE : SAVE THE TASK & REFRESH ALL THE TASKS, DON'T FORGET TO ATTACH THE FUNCTION TO THE APPROPRIATE BUTTON

    try {
      if (!text) return;
      await api.post('/tasks', { name: text });
      setText('');
      toast.success('task has been created successfully');
      handleFetchTasks();// Refresh the task list after creation
    } catch (error) {
      console.error('Error creating task', error);
    }
  };

  useEffect(() => {
    (async () => {
      handleFetchTasks();
    })();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" gap={1} mt={2}>
        <TextField required size="small" fullWidth sx={{ maxWidth: 350 }} placeholder="write your task here" onChange={(e) => setText(e.target.value)} />
        <Button variant="contained" onClick={() => { handleSave(); }}>Ajouter une tâche</Button>
      </Box>
      <Box justifyContent="center" mt={5} flexDirection="column">
        {
          tasks.map((task) => (
            <Box display="flex" justifyContent="center" alignItems="center" mt={2} gap={1} width="100%" key={task.id}>
              <TextField size="small" value={task.name} fullWidth sx={{ maxWidth: 350 }} />
              <Box>
                <IconButton color="success">
                  <Check />
                </IconButton>
                <IconButton color="secondary" onClick={() => navigate(`/update/${task.id}`)}>
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(task.id)}>
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          ))
        }
      </Box>
    </Container>
  );
};

export default TodoPage;
