const request = require('supertest');
const express = require('express');
const authController = require('../../../src/controllers/auth/authController');
const authService = require('../../../src/services/auth/authService');

// Mockear authService para controlar su comportamiento
jest.mock('../../../src/services/auth/authService');

const app = express();
app.use(express.json());
app.post('/login', authController.login);

describe('AuthController - login', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('It should respond with 200 and a token when authentication is successful.', async () => {
    const mockToken = { token: 'fake-jwt-token' };
    authService.authenticate.mockResolvedValue(mockToken);

    const response = await request(app)
      .post('/login')
      .send({ email: 'samuel@gmail.com', password: 'samuel' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockToken);
    expect(authService.authenticate).toHaveBeenCalledWith({
      email: 'samuel@gmail.com',
      password: 'samuel',
    });
  });

  test('It should respond with 401 when authentication fails.', async () => {
    authService.authenticate.mockRejectedValue(new Error('Invalid credentials'));

    const response = await request(app)
      .post('/login')
      .send({ email: 'testuser', password: 'wrongpassword' });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Invalid credentials' });
    expect(authService.authenticate).toHaveBeenCalledWith({
      email: 'testuser',
      password: 'wrongpassword',
    });
  });
});
