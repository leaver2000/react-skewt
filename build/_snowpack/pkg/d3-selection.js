import { d as select, e as creator } from './common/select-8cbe0917.js';
export { d as select } from './common/select-8cbe0917.js';

function create(name) {
  return select(creator(name).call(document.documentElement));
}

export { create };
