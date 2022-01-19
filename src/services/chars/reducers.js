const initialState = {
    chars: []
  };
  
export default function fetchChars(state = initialState, action) {

    switch (action.type) {
      case "FETCH_CHARS":
        let allChars = state.allChars ? state.allChars : []
        return {
          allChars: [...allChars,...action.payload],
          chars:action.payload,
          isLoading : false
        };
      case "FETCH_IS_LOADING":
        return {
          ...state,
          isLoading : true
        };
      default:
        return state;
    }
};

