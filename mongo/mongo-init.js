print('################ Start Create Database ################');

db = db.getSiblingDB('receipt');
db.createUser({
  user: 'root',
  pwd: 'password',
  roles: [{ role: 'readWrite', db: 'receipt' }],
});

print('################ End Create Database ################');
