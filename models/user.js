const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'name is mandatory'],
  },
  email: {
    type: String,
    required: [true, 'email is mandatory'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password is mandatory'],
  },
});

// Middleware para añadir marcas de tiempo manualmente
UserSchema.pre('save', function (next) {
  const currentDate = new Date();

  this.updated_at = currentDate;

  if (!this.created_at) {
    this.created_at = currentDate;
  }

  next();
});

// Método para transformar el campo _id a id en la respuesta JSON
UserSchema.methods.toJSON = function () {
  const { __v, _id, ...user } = this.toObject(); // Extrae __v y _id, y renombra _id a id
  user.id = _id;
  return user;
};

const User = model('User', UserSchema);

module.exports = User;
