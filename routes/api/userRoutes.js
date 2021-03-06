const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    addFriend,
    deleteFriend,
  } = require('../../controllers/userController');

// For /api/users
router.route('/').get(getUsers).post(createUser);

// For /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);
//Add put route to update a user

// For /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;