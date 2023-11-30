const axios = require('axios');

const getProducts = async (req, res) => {
  try {
    const response = await axios.get('https://dummyjson.com/carts');
    res.json(response.data);
  } catch (error) {
    console.error('Error during internal HTTPS call:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getProducts,
};