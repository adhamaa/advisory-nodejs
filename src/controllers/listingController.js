const { Listing } = require('../models/listingModel');
const { calculateDistance } = require('../utils/distance');

const getListing = async (req, res) => {
  const { user_id } = req.query;
  console.log('user_id:', user_id)

  try {
    const listings = await Listing.findAll({
      where: { user_id },
      attributes: ['id', 'name', 'latitude', 'longitude', 'created_at', 'updated_at'],
    });

    const userCoordinates = { latitude: req.body.latitude, longitude: req.body.longitude };

    const data = listings.map((listing) => ({
      ...listing.dataValues,
      distance: calculateDistance(userCoordinates, {
        latitude: listing.latitude,
        longitude: listing.longitude,
      }),
    }));

    res.json({
      status: 200,
      message: 'Success',
      result: { current_page: 1, data },
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Internal Server Error' });
  }
};

module.exports = { getListing };
