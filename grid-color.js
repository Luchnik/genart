// grid, linear-interpolation, persisted randomness
// colors, random sizes

const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {

  // const palette = random.pick(palettes);

  const palette = ["#f6f6f6", "#e8e8e8", "#333333", "#990100", "#b90504"];

  // ["#e8d5b7", "#0e2430", "#fc3a51", "#f5b349", "#e8d5b9"]

  // ["#f6f6f6", "#e8e8e8", "#333333", "#990100", "#b90504"]

  // ["#ffefd3", "#fffee4", "#d0ecea", "#9fd6d2", "#8b7a5e"]

  const createGrid = () => {
    const points = [];
    const count = 54;

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const radius = Math.abs(random.noise2D(u, v) * 0.15);
        points.push({
          color: random.pick(palette),
          radius,
          position: [ u, v ],
          rotation: random.noise2D(u, v)
        });
      }
    }
    return points;
  };

  // fixed random seed
  random.setSeed('gridRandomSeed');
  const points = createGrid().filter(() => random.value() > 0.5);

  // canvas margin
  const margin = 200;

  // arrows codes array
  const arrowsCodes = ['0x2190', '0x2191', '0x2192', '0x2193'];

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const { position, radius, color, rotation } = data;
      const [ u, v ] = position;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      // context.beginPath();
      // context.arc(x, y, radius * width, 0, 2 * Math.PI );
      // context.fillStyle = color;
      // context.fill();

      // context.fillStyle = color;
      // context.fillText('A', x, y);

      const charCode = random.pick(arrowsCodes);
      // context.fillStyle = color;
      // context.font= `${radius * width}px "Helvetica"`;
      // context.fillText(String.fromCharCode(charCode), x, y);

      context.save();
      context.fillStyle = color;
      context.font= `${radius * width}px "Helvetica"`;
      context.translate(x, y);
      context.rotate(rotation);
      context.fillText(String.fromCharCode(charCode), 0, 0);
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
