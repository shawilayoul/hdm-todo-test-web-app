import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { toast } from 'react-toastify';
import { Box, TextField, Typography, Button} from '@mui/material';

const UpdateTaskForm = () => {
  const [text, setText] = useState<string>('');
  const navigate = useNavigate()
  const { id } = useParams()
  const api = useFetch()

  const fetchTaskDetails = async (id) => {
    const response = await fetch(`/tasks/${id}`);
    const data = await response.json();
    setT(data.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!text) return;
      await api.patch(`/tasks/${id}`, { name: text });
      toast.success('task has been updated successfully');
      navigate('/')
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mt={2} gap={1} width="100%">
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h4">Update a task</Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
          <TextField
            size="small" fullWidth sx={{ maxWidth: 350 }}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button variant="contained" type="submit">Update</Button>
        </Box>
      </form>
    </Box>
  );
};

export default UpdateTaskForm;
