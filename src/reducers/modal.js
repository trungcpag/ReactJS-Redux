import * as types from "./../constants/modal";

const initialState = {
  showModal: false,
  title: null,
  component: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_MODAL: {
      return {
        ...state,
        showModal: true,
      };
    }
    case types.HIDE_MODAL: {
      return {
        ...state,
        showModal: false,
        title: "",
        component: null,
      };
    }
    case types.CHANGE_MODAL_TITLE: {
      return {
        ...state,
        title: action.payload.title,
      };
    }
    case types.CHANGE_MODAL_CONTENT: {
      const { component } = action.payload;
      return {
        ...state,
        component,
      };
    }
    default:
      return state;
  }
};

export default reducer;
