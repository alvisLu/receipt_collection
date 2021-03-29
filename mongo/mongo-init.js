print('################ Start Create Database ################');

db = db.getSiblingDB('receipt');
db.createUser({
  user: 'root',
  pwd: 'password',
  roles: [{ role: 'readWrite', db: 'receipt' }],
});

// create admin
db.createCollection('users');
db.users.insert({
  email: 'admin',
  password: 'admin',
});

print('################ End Create Database ################');
