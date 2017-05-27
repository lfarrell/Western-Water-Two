const formatting = {
  stringDate: function(month) {
    let month_names = ["Jan", "Feb", "Mar",
      "Apr", "May", "Jun",
      "Jul", "Aug", "Sep",
      "Oct", "Nov", "Dec"];

    let month_num = parseInt(month, 10) - 1;

    return month_names[month_num];
  },
};

export {formatting}
