const initState = {
  keys: [],
};

const Reducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_KEY':
      return {
        ...state,
        keys: action.keys,
      };

    case 'init':
      return {
        ...state,
        keys: [],
      };

    default:
      return state;
  }
};

export default Reducer;
