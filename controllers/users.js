const {response} = require('express');
const session = require('express-session');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const usersGet = async(req, res = response) =>  {
    const {limit = 100, from=0} = req.query;

    const users = await User.find()
    .skip(from)
    .limit(Number(limit));

    const total = await User.countDocuments();

    res.json({users, total});
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ msg: 'Invalid credentials' });
      }

      const isPasswordMatch = await bcryptjs.compare(password, user.password);

      if (!isPasswordMatch) {
        return res.status(401).json({ msg: 'Invalid credentials' });
      }
      req.session = req.session || {};
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
      );

      req.session.token = token;

      res.json({
        id: user._id,
        email: user.email,
        name: user.name,
        token,
      });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  };

const logoutUser = async (req, res) => {{

    const token = req.session.token;

    if (!token) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    // Eliminar el token de la sesión
    req.session.destroy((err) => {

        if (err) {
        return res.status(500).json({ message: 'Error during logout' });
        }

        res.status(200).json({ message: 'Logout successful' });
    });

}}

const usersPost = async (req, res = response) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });

    // Email exist
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({
        msg: 'This email already exists',
      });
    }

    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(user.password, salt);

    await user.save();

    const formattedUser = {
      created_at: user.created_at,
      email: user.email,
      id: user._id,
      name: user.name,
      updated_at: user.updated_at,
    };

    res.json({ users: [formattedUser] });
  };

  const usersPut = async (req, res = response) => {
    const { id } = req.params;
    const { password, email, name } = req.body;

    try {
        // Busca al usuario por ID
        const user = await User.findById(id);

        // Verifica si el usuario existe
        if (!user) {
            return res.status(404).json({
                msg: 'User not found',
            });
        }

        // Construye el objeto de campos a actualizar
        const updateFields = {};

        if (password) {
            const salt = bcryptjs.genSaltSync();
            updateFields.password = bcryptjs.hashSync(password, salt);
        }

        if (email) {
            updateFields.email = email;
        }

        if (name) {
            updateFields.name = name;
        }

        // Realiza la actualización y devuelve el usuario actualizado
        const updatedUser = await User.findByIdAndUpdate(id, updateFields, { new: true });

        // Devuelve la respuesta con el formato deseado
        const responseFormat = {
            email: updatedUser.email,
            name: updatedUser.name,
            password: updatedUser.password,
        };

        res.json(responseFormat);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal Server Error',
        });
    }
};

const usersPatch = (req, res = response) =>  {

    res.json({
        msg: 'Patch API - Controller'
    });
}

const mongoose = require('mongoose');

const usersDelete = async (req, res = response) => {
    const { id } = req.params;

    // Verificar si el ID es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            msg: 'ID de usuario no válido'
        });
    }

    try {
        // Buscar y eliminar el usuario por ID
        const user = await User.findByIdAndDelete(id);

        // Verificar si el usuario existe
        if (!user) {
            return res.status(404).json({
                msg: 'Usuario no encontrado'
            });
        }

        res.json({
            msg: 'Delete API - Controller',
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
};

const findUsersGet = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json(user);
      } catch (error) {
        console.error('Error al obtener usuario:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
  };


module.exports = {
    usersGet,
    usersPost,
    usersPatch,
    usersPut,
    usersDelete,
    findUsersGet,
    loginUser,
    logoutUser
}
