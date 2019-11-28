// grid, linear-interpolation, persisted randomness

const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {

  const createGrid = () => {
    const points = [];
    const count = 85;

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        points.push([ u, v ]);
      }
    }
    return points;
  };

  // fixed random seed
  random.setSeed('gridRandomSeed');
  const points = createGrid().filter(() => random.value() > 0.5);

  // canvas margin
  const margin = 200;

  return ({ context, width, height }) => {
    context.fillStyle = '#b51865';
    context.fillRect(0, 0, width, height);

    points.forEach(([ u, v ]) => {
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.arc(x, y, 5, 0, 2 * Math.PI );
      context.fillStyle = '#ffd5c0';
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);
