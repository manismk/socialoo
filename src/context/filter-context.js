import { createContext, useContext, useEffect, useReducer } from "react";
import { filterReducer } from "../reducer/filterReducer";
import { filterActions, filterValues } from "../constant";
import { useSelector } from "react-redux";

const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const { posts } = useSelector((state) => state.post);
  const [filterState, filterDispatch] = useReducer(filterReducer, {
    filteredPosts: [],
    sort: filterValues.LATEST,
  });

  useEffect(() => {
    filterDispatch({
      type: filterActions.POSTS_CHANGE,
      payload: { posts: posts },
    });
  }, [posts]);

  return (
    <FilterContext.Provider value={{ filterState, filterDispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = () => useContext(FilterContext);

export { useFilter, FilterProvider };
