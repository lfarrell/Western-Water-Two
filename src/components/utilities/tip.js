import * as d3 from 'd3';

const tip = {
  tipDiv: () => {
    let tip = document.querySelectorAll('.tooltip'); // check that there's not already a tip div

    if(tip.length) {
      return d3.select('.tooltip');
    }

    return d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);
  },

  tipShow: (tip, text) => {
    tip.transition()
      .duration(100)
      .style('opacity', .9);

    tip.html(text)
      .style('top', (d3.event.pageY-38)+'px')
      .style('left', (d3.event.pageX-38)+'px');

  },

  tipHide: (tip) => {
    tip.transition()
      .duration(500)
      .style('opacity', 0);
  }
}

export { tip };
