const login = async (credentials: LoginCredentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Login error details:', error);
    throw error;
  }
};
