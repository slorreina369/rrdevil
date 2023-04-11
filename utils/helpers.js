/**
 * Handlebar helper to get the first n items in a list
 * @param {array} array
 * @param {number} limit number of items to extract from list
 * @returns
 */
function upto(array, limit) {
  return array.slice(0, limit);
}

module.exports = { upto };
