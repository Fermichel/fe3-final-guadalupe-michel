export const dentistsReducer = (state, action) => {
  switch (action.type) {
    case "GET-DENTISTS":
      return { dentistList: action.payload, dentist: state.dentist };
    case "GET-DENTIST":
      return { dentistList: state.dentistList, dentist: action.payload };
    default:
      throw new Error();
  }
};
export const favReducer = (state, action) => {
  switch (action.type) {
    case "ADD-FAV":
      return [...state, action.payload];
    case "DELETE-FAV":
      return state.filter((fav) => fav.id !== action.payload);
    default:
      throw new Error();
  }
};
export const themeReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE-THEME":
      const newTheme = state.theme == "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return { ...state, theme: newTheme };
    default:
      return state;
  }
};
