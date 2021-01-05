const Listing = require("../../models/listing");
const User = require("../../models/user");
const { dateToString } = require("../../helpers/date");

const listings = async (eventIds) => {
  try {
    const listings = await Listing.find({ _id: { $in: eventIds } });
    return listings.map((listing) => {
      return transformListing(listing);
    });
  } catch (err) {
    throw err;
  }
};

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdListing: listings.bind(this, user._doc.createdListing),
    };
  } catch (err) {
    throw err;
  }
};

const transformListing = (event) => {
  return {
    ...event._doc,
    _id: event.id,
    creator: user.bind(this, event.creator),
  };
};

exports.transformListing = transformListing;
