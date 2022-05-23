import { Leaderboard, Whatshot } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { filterValues } from "../../constant";
import { filterChange } from "../../store/features/postSlice";
import "./filter.css";

export const Filter = () => {
  const { sort } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    dispatch(filterChange({ sort: e.target.value }));
  };
  return (
    <div className="filter--container">
      <div className="filter--items">
        <input
          type="radio"
          id={filterValues.TRENDING}
          className="filter--radio"
          name="filter"
          value={filterValues.TRENDING}
          checked={sort === filterValues.TRENDING ? true : false}
          onChange={(e) => changeHandler(e)}
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
          checked={sort === filterValues.LATEST ? true : false}
          onChange={(e) => changeHandler(e)}
        />
        <label htmlFor={filterValues.LATEST} className="filter--radio--label">
          <Leaderboard />
          Latest
        </label>
      </div>
    </div>
  );
};
