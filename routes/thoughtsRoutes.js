const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
  } = require('../../controllers/thoughtsController');

// For /api/thoughts
router.route('/').get(getThoughts);

// For /api/thoughts/:userId
router.route('/:userId').get(getSingleThought).post(createThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction);

module.exports = router;