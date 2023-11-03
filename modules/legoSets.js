// Importing required data
const setData = require("../data/setData");
const themeData = require("../data/themeData");

// Declare an empty array for processed Lego sets
let sets = [];

// Initialize sets array
const initialize = () => {
  return new Promise((resolve, reject) => {
    setData.forEach(set => {
      const themeInfo = themeData.find(theme => theme.id === set.theme_id);
      if (themeInfo) {
        sets.push({ ...set, theme: themeInfo.name });
      }
    });
    if (sets.length > 0) {
      resolve();
    } else {
      reject("Initialization failed");
    }
  });
};

// Return all sets
const getAllSets = () => {
  return new Promise((resolve) => {
    resolve(sets);
  });
};

// Return set by set number
const getSetByNum = setNum => {
  return new Promise((resolve, reject) => {
    const set = sets.find(s => s.set_num === setNum);
    if (set) {
      resolve(set);
    } else {
      reject("Unable to find requested set");
    }
  });
};

// Return sets by theme
const getSetsByTheme = theme => {
  return new Promise((resolve, reject) => {
    const filteredSets = sets.filter(set =>
      set.theme.toLowerCase().includes(theme.toLowerCase())
    );
    if (filteredSets.length > 0) {
      resolve(filteredSets);
    } else {
      reject("Unable to find requested sets");
    }
  });
};

// Export functions
module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };

// Testing the functions
initialize()
  .then(() => {
    return getAllSets();
  })
  .then(allSets => {
    console.log("All Sets: ", allSets);

    return getSetByNum("001-1");
  })
  .then(singleSet => {
    console.log("Single Set: ", singleSet);

    return getSetsByTheme("Technic");
  })
  .then(setsByTheme => {
    console.log("Sets by Theme: ", setsByTheme);
  })
  .catch(err => {
    console.error(err);
  });
