const { User, Pet, Donation, Supply } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
  Query: {
    users: async () => {
      return User.find({});
    },
    oneUser: async (parent, { id, username }, context) => {
      const foundUser = await User.findOne({
        $or: [
          { _id: context.user ? context.user._id : id },
          { username: username },
        ],
      }).populate({
        path: "donations.pets",
        populate: "supplies",
      });
      if (!foundUser) {
        throw new AuthenticationError("Cannot find a user with this id!");
      }
      return foundUser;
    },
    pets: async () => {
      return Pet.find({}).populate("supplies");
    },
    onePet: async (parent, { id, name }, context) => {
      const foundPet = await Pet.findOne({
        $or: [{ _id: context.pet ? context.pet._id : id }, { name: name }],
      }).populate("supplies");
      if (!foundPet) {
        throw new AuthenticationError("Cannot find a pet with this id/name");
      }
      return foundPet;
    },
    donation: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "donations.pets",
          populate: "supplies",
        });

        return user.donations.id(_id);
      }
    },
    donations: async () => {
      return Donation.find({});
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const donation = new Donation({ pets: args.pets });
      const line_items = [];

      const { pets } = await donation.populate("pets");

      for (let i = 0; i < pets.length; i++) {
        const pet = await stripe.pets.create({
          name: pets[i].name,
          description: pets[i].description,
          images: [`${url}/images/${pets[i].image}`],
        });

        const price = await stripe.prices.create({
          pet: pet.id,
          unit_amount: pets[i].price * 100,
          currency: "usd",
        });

        line_items.push({
          price: price.id,
          quantity: 1,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
    // this checkout query can be modified/replaced as needed.
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    // add one pet at a time
    addPet: async (parent, args) => {
      const pet = await Pet.create(args);

      return pet;
    },
    login: async (parent, args) => {
      const user = await User.findOne({
        $or: [{ username: args.username }, { email: args.email }],
      });
      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(args.password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    // donate: async (parent, args, context) => {
    //   if (context.user) {
    //     const donation = new Donation(args);

    //     await User.findByIdAndUpdate(context.user._id, {
    //       $push: { donations: donation._id },
    //     });

    //     return donation;
    //   }

    //   throw new AuthenticationError("Not logged in");
    // },
    donate: async (parent, args, context) => {
      const donation = await Donation.create(args);

      if (context.user) {
        await User.findByIdAndUpdate(context.user._id, {
          $push: { donations: donation._id},
        });
      }

      return donation;
    },
  },
};

module.exports = resolvers;
