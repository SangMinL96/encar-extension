"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initReact = exports.initScss = exports.initIndex = void 0;
const initIndex = (name) => {
    return `export { default } from './${name}';`;
};
exports.initIndex = initIndex;
const initScss = () => {
    return `// @import "app/assets/scss/spr/";
// @import "app/assets/scss/spr/util.scss";`;
};
exports.initScss = initScss;
const initReact = (name) => {
    return `import React from 'react';
import classNames from 'classnames/bind';
import styles from './${name}.module.scss';
  
const cx = classNames.bind(styles);
function ${name}() {
     return <div>${name}</div>;
}
  
export default ${name};`;
};
exports.initReact = initReact;
//# sourceMappingURL=index.js.map