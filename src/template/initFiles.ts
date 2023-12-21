export const initIndex = (name: string) => {
    return `export { default } from './${name}';`;
  };
  
  export const initScss = () => {
    return `// @import "app/assets/scss/spr/";
  // @import "app/assets/scss/spr/util.scss";`;
  };
  
  export const initReact = (name: string) => {
    return `import React from 'react';
  import classNames from 'classnames/bind';
  import styles from './${name}.module.scss';
    
  const cx = classNames.bind(styles);
  function ${name}() {
       return <div>${name}</div>;
  }
    
  export default ${name};`;
  };
  