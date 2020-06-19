module.exports = function (object){

  let cache = [];
  const string = JSON.stringify(
    object,
    // custom replacer - gets around "TypeError: Converting circular structure to JSON"
    (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Circular reference found, discard key
          return;
        }
        // Store value in collection
        cache.push(value);
      }
      return value;
    },
    4
  );
  cache = null; // garbage collection
  return string;
}