db = db.getSiblingDB('task-manager');

// Crear un usuario con permisos de lectura y escritura
db.createUser({
  user: 'test_user',
  pwd: 'test_password',
  roles: [
    { role: 'readWrite', db: 'task-manager' }
  ]
});

// Insertar datos de prueba
db.users.insertOne({
  name: 'test_user',
  email: 'samuel@gmail.com',
  password: 'samuel',
  createdAt: new Date(),
  updatedAt: new Date()
});