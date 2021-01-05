const Listing = require("../../models/listing");
const User = require("../../models/user");
const { transformListing } = require("./merge");

const path = require("path");
const fs = require("fs");

module.exports = {
  Query: {
    getListing: async (_, args, { req }) => {
      // if (!req.isAuth) {
      //   throw new Error("Unauthenticated!");
      // }
      try {
        let events;
        if (args.user) {
          events = await Listing.find({ creator: args.user });
        } else {
          events = await Listing.find();
        }
        return events.map((event) => {
          return transformListing(event);
        });
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    addListing: async (_, args, { req }) => {
      // if (!req.isAuth) {
      //   throw new Error("Unauthenticated!");
      // }
      req.userId = "5fe97bcb89d96528ec86aa8b";
      const { createReadStream, filename, mimetype, encoding } = await args
        .listingInput.images;

      const genratedfilename = Math.random() * 20 + filename;
      const stream = createReadStream();
      const pathName = path.join(
        __dirname,
        `../../public/images/${genratedfilename}`
      );
      await stream.pipe(fs.createWriteStream(pathName));

      const event = new Listing({
        images: `http://localhost:8000/images/${genratedfilename}`,
        title: args.listingInput.title,
        description: args.listingInput.description,
        price: +args.listingInput.price,
        category: args.listingInput.category,
        creator: req.userId,
      });
      let createdListing;
      try {
        const result = await event.save();
        createdListing = transformListing(result);
        const creator = await User.findById(req.userId);

        if (!creator) {
          throw new Error("User not found.");
        }
        creator.createdlisting.push(event);
        await creator.save();

        return createdListing;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
};
