import { createHashRouter } from 'react-router-dom';
import TodoPage from '../components/TodoPage.tsx';
import UpdateTaskForm from '../components/UpdateTaskForm.tsx';

export default createHashRouter([
  {
    path: '/',
    element: <TodoPage />,
  },
  {
    path: '/update/:id',
    element: <UpdateTaskForm />,
  },
]);
