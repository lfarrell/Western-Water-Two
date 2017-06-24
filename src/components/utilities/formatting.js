import * as d3 from 'd3';

const formatting = {
  stringDate: function(month) {
    let month_names = ["Jan", "Feb", "Mar",
      "Apr", "May", "Jun",
      "Jul", "Aug", "Sep",
      "Oct", "Nov", "Dec"];

    let month_num = parseInt(month, 10) - 1;

    return month_names[month_num];
  },

  mapScaling: function(height, width, map) {
    let scale = 1,
      projection = d3.geoAlbers()
        .scale(scale)
        .translate([0,0]);

    let path = d3.geoPath().projection(projection);
    let bounds = path.bounds(map);
    scale = .95 / Math.max((bounds[1][0] - bounds[0][0]) / width, (bounds[1][1] - bounds[0][1]) / height);

    let translation = [(width - scale * (bounds[1][0] + bounds[0][0])) / 2,
      (height - scale * (bounds[1][1] + bounds[0][1])) / 2];

    // update projection
    projection = d3.geoAlbersUsa()
      .scale(scale)
      .translate(translation);
    path = path.projection(projection);

    return {path: path, projection: projection};
  }
};

export {formatting}
