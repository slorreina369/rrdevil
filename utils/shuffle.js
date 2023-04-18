/**
 * Shuffles array randomly
 * @param {array} array
 */
function shuffle(array) {
  array.sort(() => (Math.random() > 0.5 ? 1 : -1));
  //NOTE: I swear to god if you make this more complicated than needed, I will fight you
}

module.exports = shuffle;
