import * as d3 from "d3";

const formatting = {
  stringDate: function(month, full) {
    let month_names;

    if(full !== undefined) {
      month_names = [
        'January', 'February', 'March',
        'April', 'May', 'June', 'July',
        'August', 'September', 'October',
        'November', 'December'
      ]
    } else {
      month_names = ['Jan', 'Feb', 'Mar',
        'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep',
        'Oct', 'Nov', 'Dec'];
    }

    let month_num = parseInt(month, 10) - 1;

    return month_names[month_num];
  },

  fullStateName: function(val) {
    let states = {
      AZ: 'Arizona',
      CA: 'California',
      CO: 'Colorado',
      ID: 'Idaho',
      MT: 'Montana',
      NM: 'New Mexico',
      NV: 'Nevada',
      OR: 'Oregon',
      TX: 'Texas',
      UT: 'Utah',
      WA: 'Washington',
      WY: 'Wyoming'
    };

    return states[val];
  },

  mapScaling: function(height, width, map, state) {
    let scale = 1,
      mapType = (state !== 'none') ? d3.geoMercator() : d3.geoAlbersUsa(),
      projection = mapType
        .scale(scale)
        .translate([0,0]);

    let path = d3.geoPath().projection(projection);
    let bounds = path.bounds(map);
    scale = .95 / Math.max((bounds[1][0] - bounds[0][0]) / width, (bounds[1][1] - bounds[0][1]) / height);
    let translation = [(width - scale * (bounds[1][0] + bounds[0][0])) / 2,
      (height - scale * (bounds[1][1] + bounds[0][1])) / 2 + yOffset(state)];

    // update projection
    projection = mapType
      .scale(scale)
      .translate(translation);
    path = path.projection(projection);

    return {path: path, projection: projection};
  }
};

function yOffset(state) {
  switch(state) {
    case 'CO':
      return -10;
    case 'OR':
      return -30;
    case 'MT':
      return -70;
    case 'WA':
      return -20;
    default:
      return 0;
  }
}

export {formatting}
