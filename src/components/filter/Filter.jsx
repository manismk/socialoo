import { Leaderboard, Whatshot } from "@mui/icons-material";
import { filterActions, filterValues } from "../../constant";
import { useFilter } from "../../context";
import "./filter.css";

const changeHandler = (e, filterDispatch) => {
  filterDispatch({
    type: filterActions.SORT_CHANGE,
    payload: { sort: e.target.value },
  });
};
export const Filter = () => {
  const { filterState, filterDispatch } = useFilter();
  return (
    <div className="filter--container">
      <div className="filter--items">
        <input
          type="radio"
          id={filterValues.TRENDING}
          className="filter--radio"
          name="filter"
          value={filterValues.TRENDING}
          checked={filterState.sort === filterValues.TRENDING ? true : false}
          onChange={(e) => changeHandler(e, filterDispatch)}
        />
        <label htmlFor={filterValues.TRENDING} className="filter--radio--label">
          <Whatshot />
          Trending
        </label>
      </div>
      <div className="filter--items">
        <input
          type="radio"
          id={filterValues.LATEST}
          className="filter--radio"
          name="filter"
          value={filterValues.LATEST}
          checked={filterState.sort === filterValues.LATEST ? true : false}
          onChange={(e) => changeHandler(e, filterDispatch)}
        />
        <label htmlFor={filterValues.LATEST} className="filter--radio--label">
          <Leaderboard />
          Latest
        </label>
      </div>
    </div>
  );
};
