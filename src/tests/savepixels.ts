import ndarray from 'ndarray';
import ops from 'ndarray-ops';
import PNG1 from 'pngjs-nozlib';
import through from 'through';

const PNG = PNG1.PNG;

function handleData(array, data, frame?) {
  // let i;
  // let j;
  // let ptr = 0;
  if (array.shape.length === 4) {
    return handleData(array.pick(frame), data, 0);
  } else if (array.shape.length === 3) {
    if (array.shape[2] === 3) {
      ops.assign(
        ndarray(
          data,
          [array.shape[0], array.shape[1], 3],
          [4, 4 * array.shape[0], 1]
        ),
        array
      );
      ops.assigns(
        ndarray(data, [array.shape[0] * array.shape[1]], [4], 3),
        255
      );
    } else if (array.shape[2] === 4) {
      ops.assign(
        ndarray(
          data,
          [array.shape[0], array.shape[1], 4],
          [4, array.shape[0] * 4, 1]
        ),
        array
      );
    } else if (array.shape[2] === 1) {
      ops.assign(
        ndarray(
          data,
          [array.shape[0], array.shape[1], 3],
          [4, 4 * array.shape[0], 1]
        ),
        ndarray(
          array.data,
          [array.shape[0], array.shape[1], 3],
          [array.stride[0], array.stride[1], 0],
          array.offset
        )
      );
      ops.assigns(
        ndarray(data, [array.shape[0] * array.shape[1]], [4], 3),
        255
      );
    } else {
      return new Error('Incompatible array shape');
    }
  } else if (array.shape.length === 2) {
    ops.assign(
      ndarray(
        data,
        [array.shape[0], array.shape[1], 3],
        [4, 4 * array.shape[0], 1]
      ),
      ndarray(
        array.data,
        [array.shape[0], array.shape[1], 3],
        [array.stride[0], array.stride[1], 0],
        array.offset
      )
    );
    ops.assigns(ndarray(data, [array.shape[0] * array.shape[1]], [4], 3), 255);
  } else {
    return new Error('Incompatible array shape');
  }
  return ndarray(data, [array.shape[0], array.shape[1], 4])
}

function haderror(err) {
  const result = through();
  result.emit('error', err);
  return result;
}

export function createPNG(array, type, options?) {
  options = options || {};
  switch (type.toUpperCase()) {
    case 'PNG':
    case '.PNG':
      const png = new PNG({
        width: array.shape[0],
        height: array.shape[1]
      });
      const arr = handleData(array, png.data);
      png.data = arr.data;
      return [png, arr];

    default:
      return haderror(new Error('Unsupported file type: ' + type));
  }
}

export function savePixels(array, type, options?) {
  options = options || {};
  const [myPng, arr] = createPNG(array, type, options);
  myPng.pack();
  return myPng;
}
