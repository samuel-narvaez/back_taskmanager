db = db.getSiblingDB('task-manager');

db.createUser({
    user: 'test_user',
    pwd: 'test_password',
    roles: [
        { role: 'readWrite', db: 'task-manager' }
    ]
});

// Insertar un usuario de prueba en la colección 'users'
db.users.insertOne({
    name: 'test_user',
    email: 'samuel@gmail.com',
    password: 'samuel',
    createdAt: new Date(),
    updatedAt: new Date()
});