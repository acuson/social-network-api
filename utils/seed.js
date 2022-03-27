const connection = require('../config/connection');
const { user, thoughts } = require('../models');
const { userData, thoughtData } = require('./data');

// Seeding thoughts
const seedThoughts = async () => {
  for (const thought of thoughtData) {
      const newThought = await Thought.create(thought);
      await User.findOneAndUpdate(
          { username: newThought.username },
          { $push: { thoughts: newThought._id } }
      );
  }
};

// Seeding friends
const seedFriends = async () => {
  const friends = await User.find({}).select("_id");
  for (const id of friends) {
      await User.findOneAndUpdate(
          { _id: id },
          { $push: { friends: friends.filter(friend => friend !== id) } }
      );
  }
};


connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing thoughts
  await thoughts.deleteMany({});
  console.log('Deleted any existing thoughts.');

  // Drop existing users
  await user.deleteMany({});
  console.log('Deleted any existing users.');

  // Insert user data
  await User.collection.insertMany(userData);
  console.log('Seeded users.');

  // Insert thought data
  await seedThoughts();
  console.log('Seeded thoughts.');

  // Insert friend data
  await seedFriends();
  console.log('Seeded friends.');

  // Create empty array to hold the users
  const users = [];

  process.exit(0);
});