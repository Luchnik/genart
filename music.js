// MUSIC

const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: 'A3',
  pixelsPerInch: 300
};

const sketch = () => {

  const palette = ['#B94629', '#E3DEC1', '#E89F65', '#47AFAF'];

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
          color: random.pick(palette),
          position: [ u, v ]
        });
      }
    }
    return points;
  };

  random.setSeed('32');
  const points = createGrid().filter(() => random.value() > 0.5);

  // canvas margin
  const margin = 200;

  // music codes array
  const musicCodes = [
    '0x2669', '0x266A', '0x266B', '0x266C', '0x266D', '0x266E', '0x266F',
  ];

  return ({ context, width, height }) => {
    context.fillStyle = '#000';
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const { position, radius, color } = data;
      const [ u, v ] = position;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
      const charCode = random.pick(musicCodes);

      context.save();
      context.beginPath();
      context.fillStyle = color;
      context.font= `${radius * width}px ""`;
      context.textAlign = 'center';
      context.fillText(String.fromCharCode(charCode), x, y);
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
