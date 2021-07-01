const host = '';
const prefix = 'api/v1';

export default {
  objects: () => [host, prefix, 'objects'].join('/'),
  objectMovements: (id) => [host, prefix, 'objects', id, 'movements'].join('/'),
};
