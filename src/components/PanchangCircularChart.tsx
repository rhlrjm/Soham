import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Period {
  label: string;
  start: string; // "HH:MM AM/PM"
  end: string;
  type: 'auspicious' | 'inauspicious';
}

interface Props {
  periods: Period[];
}

const parseTimeToDecimal = (timeStr: string): number => {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (modifier === 'PM' && hours !== 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;
  return hours + minutes / 60;
};

export const PanchangCircularChart: React.FC<Props> = ({ periods }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Create 24-hour clock scale
    const pie = d3.pie<number>().value((d) => d).sort(null);
    const arc = d3.arc<d3.PieArcDatum<number>>()
      .innerRadius(radius - 50)
      .outerRadius(radius);

    // Default neutral segments (24 hours)
    const data = new Array(24).fill(1);
    const arcs = pie(data);

    g.selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', '#1e293b')
      .attr('stroke', '#334155');

    // Add Periods
    periods.forEach((period) => {
      const start = parseTimeToDecimal(period.start);
      const end = parseTimeToDecimal(period.end);
      
      const startAngle = (start / 24) * 2 * Math.PI;
      const endAngle = (end / 24) * 2 * Math.PI;

      const arcGenerator = d3.arc<any>()
        .innerRadius(radius - 55)
        .outerRadius(radius + 5)
        .startAngle(startAngle)
        .endAngle(endAngle);

      g.append('path')
        .attr('d', arcGenerator)
        .attr('fill', period.type === 'auspicious' ? '#10b981' : '#f43f5e')
        .attr('stroke', 'white')
        .attr('stroke-width', 2);
    });
  }, [periods]);

  return <svg ref={svgRef} width={300} height={300} className="mx-auto" />;
};
