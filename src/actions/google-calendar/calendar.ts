import axios from 'axios';
import {api} from '../../config/api/api';

const API_BASE_URL = 'http://localhost:3000/api/google-calendar';

export default {
  // Método para redirigir a la autenticación
  getAuthUrl: async () => {
    try {
      const response = await api('/google-calendar/auth', 'GET');
      console.log(response);
      return response; // Retorna la URL de autenticación de Google
    } catch (error) {
      console.error('Error obteniendo URL de autenticación', error);
    }
  },

  // Método para crear un evento
  createEvent: async event => {
    try {
      const response = await axios.post(`${API_BASE_URL}/events`, event);
      return response.data;
    } catch (error) {
      console.error('Error creando evento', error);
    }
  },

  // Método para listar eventos
  listEvents: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/events`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo eventos', error);
    }
  },
};
