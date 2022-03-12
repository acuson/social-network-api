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
    
}
