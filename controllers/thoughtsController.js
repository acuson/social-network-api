const {user, thoughts} = require('../models');

// Aggregate function for overall thoughts
const allThoughts = async () => 
    thoughts.aggregate()
        .count('thoughtsCount')
        .then((numberofThoughts) => numberofThoughts);


module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        thoughts.find()
            .then(async (thoughts) => {
                const thoughtsObj = {
                    thoughts,
                    headCount: await allThoughts(),
                };
                return res.json(thoughtsObj)
            })
            .catch((err) => {
                console.log(err);
                return res.json(500).json(err);
            });
    },
    // Get a single thought
    getSingleThought(req, res) {
        thoughts.findOne({_id: req.params.thoughtsId })
            .select('-__v')
            .then(async (thoughts) =>
            !thoughts
                ? res.status(404).json({ message: 'No thought with this ID'})
                : res.json(thoughts)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Update new thought
    updateThought(res, req) {
        thoughts.findOneAndUpdate(req.body)
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // Create new thought
    createThought(res, req) {
        thoughts.create(req.body)
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // Delete thought
    deleteThought(res, req) {
        thoughts.findOneAndRemove({ _id: req.params.thoughtsId })
            .then((thoughts) => 
            !thoughts
                ? res.status(404).json({ message: 'No such thought exists'})
                : res.json({ message: 'Thought successfully deleted'})
            )
    },
    // Create a reaction to a thought
    createReaction(req, res) {
        console.log('You are adding a reaction');
        console.log(req.body);
        thoughts.findOneAndUpdate(
          { _id: req.params.thoughtsId },
        )
          .then((thoughts) =>
            !thoughts
              ? res
                  .status(404)
                  .json({ message: 'No thought found with this ID' })
              : res.json(thoughts)
          )
          .catch((err) => res.status(500).json(err));
      },
      // Delete a reaction from a thought
      deleteReaction(req, res) {
        console.log('You are deleting a reaction')  
        thoughts.findOneAndUpdate(
          { _id: req.params.thoughtsId },
          { runValidators: true, new: true }
        )
          .then((thoughts) =>
            !thoughts
              ? res
                  .status(404)
                  .json({ message: 'No thought found with this ID' })
              : res.json(thoughts)
          )
          .catch((err) => res.status(500).json(err));
      },
};
