const {user, thoughts} = require('../models');

// Aggregate function for overall users
const allUsers = async () => 
    user.aggregate()
        .count('userCount')
        .then((numberofUsers) => numberofUsers);


module.exports = {
    // Get all users
    getUsers(req, res) {
        user.find()
            .then(async (users) => {
                const userObj = {
                    users,
                    headCount: await allUsers(),
                };
                return res.json(userObj)
            })
            .catch((err) => {
                console.log(err);
                return res.json(500).json(err);
            });
    },
    // Get a single user
    getSingleUser(req, res) {
        user.findOne({_id: req.params.userId })
            .select('-__v')
            .then(async (users) =>
            !users
                ? res.status(404).json({ message: 'No user with this ID'})
                : res.json(users)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Create new user
    createUser(res, req) {
        user.create(req.body)
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // Delete user
    deleteUser(res, req) {
        user.findOneAndRemove({ _id: req.params.userId })
            .then((users) => 
            !users
                ? res.status(404).json({ message: 'No such user exists'})
                : res.json({ message: 'User successfully deleted'})
            )
    },
    // Add a friend to a user
    addFriend(req, res) {
        console.log('You are adding a friend');
        console.log(req.body);
        user.findOneAndUpdate(
          { _id: req.params.userId },
        )
          .then((users) =>
            !users
              ? res
                  .status(404)
                  .json({ message: 'No user found with this ID' })
              : res.json(users)
          )
          .catch((err) => res.status(500).json(err));
      },
      // Delete a friend from a user
      deleteFriend(req, res) {
        user.findOneAndUpdate(
          { _id: req.params.userId },
          { runValidators: true, new: true }
        )
          .then((users) =>
            !users
              ? res
                  .status(404)
                  .json({ message: 'No user found with this ID' })
              : res.json(users)
          )
          .catch((err) => res.status(500).json(err));
      },
};
