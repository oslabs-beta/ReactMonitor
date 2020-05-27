import * as d3 from 'd3';
import mockTree from './mockTree';

const width = 500;
// const height = 500;

const data = mockTree;

const tree = (data) => {
  const root = d3.hierarchy(data);
  root.dx = 10;
  root.dy = width / (root.height + 1);
  return d3.tree().nodeSize([root.dx, root.dy])(root);
};

export default class D3Tree {
  constructor(element) {
    const root = tree(data);
    console.log('this is the data: ', data);
    console.log('this is the root val: ', root);

    let x0 = 0;
    let x1 = -x0;
    root.each((d) => {
      if (d.x > x1) x1 = d.x;
      if (d.x < x0) x0 = d.x;
    });

    const svg = d3
      .select(element)
      .append('svg')
      .attr('viewBox', [0, 0, width, x1 - x0 + root.dx * 2]);

    const g = svg
      .append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('transform', `translate(${root.dy / 3},${root.dx - x0})`);

    const link = g
      .append('g')
      .attr('fill', 'none')
      .attr('stroke', '#555')
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', 1.5)
      .selectAll('path')
      .data(root.links())
      .join('path')
      .attr(
        'd',
        d3
          .linkHorizontal()
          .x((d) => d.y)
          .y((d) => d.x)
      );

    const node = g
      .append('g')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-width', 3)
      .selectAll('g')
      .data(root.descendants())
      .join('g')
      .attr('transform', (d) => `translate(${d.y},${d.x})`);

    node
      .append('circle')
      .attr('fill', (d) => (d.children ? '#555' : '#999'))
      .attr('r', 2.5);

    node
      .append('text')
      .attr('dy', '0.31em')
      .attr('x', (d) => (d.children ? -6 : 6))
      .attr('text-anchor', (d) => (d.children ? 'end' : 'start'))
      .text((d) => d.data.name)
      .clone(true)
      .lower()
      .attr('stroke', 'white');
  }
}

// const MARGIN = {
//   top: 20,
//   bottom: 50,
//   left: 70,
//   right: 20,
// };
// const WIDTH = 800 - MARGIN.left - MARGIN.right;
// const HEIGHT = 500 - MARGIN.top - MARGIN.bottom;

// export default class D3Tree {
//   constructor(element) {
//     const vis = this;

//     vis.svg = d3
//       .select(element)
//       .append('svg')
//       .attr('width', WIDTH + MARGIN.left + MARGIN.right)
//       .attr('height', HEIGHT + MARGIN.top + MARGIN.bottom)
//       .append('g')
//       .attr('transform', `translate(${MARGIN.left}, ${MARGIN.top})`);

//     vis.xLabel = vis.svg
//       .append('text')
//       .attr('x', WIDTH / 2)
//       .attr('y', HEIGHT + 50)
//       .attr('text-anchor', 'middle');

//     vis.svg
//       .append('text')
//       .attr('x', -(HEIGHT / 2))
//       .attr('y', -50)
//       .attr('text-anchor', 'middle')
//       .text('height in cm')
//       .attr('transform', 'rotate(' + -90 + ')');

//     vis.xAxisGroup = vis.svg
//       .append('g')
//       .attr('transform', `translate(0, ${HEIGHT})`);

//     vis.yAxisGroup = vis.svg.append('g');

//     Promise.all([
//       d3.json('https://udemy-react-d3.firebaseio.com/tallest_men.json'),
//       d3.json('https://udemy-react-d3.firebaseio.com/tallest_women.json'),
//     ]).then((datasets) => {
//       vis.menData = datasets[0];
//       vis.womenData = datasets[1];
//       vis.update('men');
//     });
//   }

//   update(gender) {
//     const vis = this;

//     vis.data = gender === 'men' ? vis.menData : vis.womenData;
//     vis.xLabel.text(`The world's tallest ${gender}`);
//     const yScale = d3
//       .scaleLinear()
//       .domain([
//         d3.min(vis.data, (d) => d.height * 0.95),
//         d3.max(vis.data, (d) => d.height),
//       ])
//       .range([HEIGHT, 0]);
//     const xScale = d3
//       .scaleBand()
//       .domain(vis.data.map((person) => person.name))
//       .range([0, WIDTH])
//       .padding(0.5);

//     const xAxisCall = d3.axisBottom(xScale);
//     vis.xAxisGroup.transition().duration(500).call(xAxisCall);

//     const yAxisCall = d3.axisLeft(yScale);
//     vis.yAxisGroup.transition().duration(500).call(yAxisCall);

//     // DATA JOIN
//     const rects = vis.svg.selectAll('rect').data(vis.data);

//     // EXIT
//     rects
//       .exit()
//       .transition()
//       .duration(300)
//       .attr('fill', 'red')
//       .attr('y', HEIGHT)
//       .attr('height', 0)
//       .remove();

//     // UPDATE
//     rects
//       .transition()
//       .duration(500)
//       .attr('x', (d) => xScale(d.name))
//       .attr('width', xScale.bandwidth)
//       .attr('y', (d) => yScale(d.height))
//       .attr('height', (d) => HEIGHT - yScale(d.height));

//     // ENTER
//     rects
//       .enter()
//       .append('rect')
//       .attr('x', (d) => xScale(d.name))
//       .attr('y', HEIGHT)
//       .attr('width', xScale.bandwidth)
//       .attr('fill', 'green')
//       .transition()
//       .duration(500)
//       .attr('y', (d) => yScale(d.height))
//       .attr('height', (d) => HEIGHT - yScale(d.height));
//   }
// }
