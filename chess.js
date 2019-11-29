// CHESS

const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: 'A3',
  pixelsPerInch: 300
};

const sketch = () => {

  const createGrid = () => {
    const points = [];
    const count = 35;

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const radius = Math.abs(random.noise2D(u, v) * 0.045);
        points.push({
          radius,
          position: [ u, v ]
        });
      }
    }
    return points;
  };

  random.setSeed('18');
  const points = createGrid().filter(() => random.value() > 0.5);

  // canvas margin
  const margin = 200;

  // chess codes array
  const chessCodes = [
    '0x2654', '0x2655', '0x2656', '0x2657', '0x2658', '0x2659',
    '0x265A', '0x265B', '0x265C', '0x265D', '0x265E', '0x265F'
  ];

  return ({ context, width, height }) => {
    context.fillStyle = '#000';
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const { position, radius } = data;
      const [ u, v ] = position;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
      const charCode = random.pick(chessCodes);

      context.save();
      context.beginPath();
      context.fillStyle = '#fbf0d0';
      context.font= `${radius * width}px ""`;
      context.textAlign = 'center';
      context.fillText(String.fromCharCode(charCode), x, y);
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
