import * as d3 from 'd3';

const tip = {
  tipDiv: () => {
    let tip = document.querySelectorAll('.tooltips'); // check that there's not already a tip div

    if(tip.length) {
      return d3.select('.tooltips');
    }

    return d3.select('body').append('div')
      .attr('class', 'tooltips')
      .style('opacity', 0);
  },

  tipShow: (tip, text, event) => {
    let x_screen, y_screen;

    if(event !== undefined) {
      let offset;

      if(/map/.test(event.target.id)) {
        offset = 38;
      } else if(/snow/.test(event.target.id)) {
        offset = 158;
      } else {
        offset = 138;
      }

      x_screen = event.pageX - 38;
      y_screen = event.pageY - offset;
    } else {
      x_screen = d3.event.pageX - 38;
      y_screen = d3.event.pageY - 38;
    }

    tip.transition()
      .duration(100)
      .style('opacity', .9);

    tip.html(text)
      .style('top', `${y_screen}px`)
      .style('left', `${x_screen}px`);

  },

  tipHide: (tip) => {
    tip.transition()
      .duration(500)
      .style('opacity', 0);
  }
}

export { tip };
