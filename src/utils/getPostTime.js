import moment from "moment";

export const getPostTime = (date) => {
  if (moment().diff(moment(date), "days") <= 7) {
    return moment(date).fromNow();
  } else {
    return moment(date).format("DD MMM YYYY");
  }
};
