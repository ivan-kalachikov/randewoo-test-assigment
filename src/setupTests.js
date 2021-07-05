/* eslint-disable func-names */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

const createElementNSOrig = global.document.createElementNS;
global.document.createElementNS = function (...args) {
  const [namespaceURI, qualifiedName] = args;
  if (namespaceURI === 'http://www.w3.org/2000/svg' && qualifiedName === 'svg') {
    const element = createElementNSOrig.apply(this, args);
    element.createSVGRect = function () {};
    return element;
  }
  return createElementNSOrig.apply(this, args);
};
