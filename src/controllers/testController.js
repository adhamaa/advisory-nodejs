const sequelize = require("../utils/database");

const testConnection = async (req, res) => {
  try {
    await sequelize.authenticate();

    res.json({
      status: 200,
      message: 'Connection has been established successfully.',
      result: { current_page: 1, data },
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: `Unable to connect to the database: ${error}` });
  }
};

module.exports = { testConnection };
