import { removeUser } from './store';
import { toast } from 'react-hot-toast';

export const logoutAction = (message?: string) => {
  removeUser()
  window.location.replace('http://localhost:3000/login')

  if (message) {
    toast.error(message)
  }
}

export default logoutAction