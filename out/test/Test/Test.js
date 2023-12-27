import React from "react";
import classNames from "classnames/bind";
import styles from "./Test.module.scss";

const cx = classNames.bind(styles);
function Test() {
  return (
    <div className={cx("tttest")}>
      <div className={cx("desc")}></div>
    </div>
  );
}

export default Test;
