import PropTypes from 'prop-types'
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

function Button({
  to,
  href,
  text = false,
  rounded = false,
  disabled = false,
  primary = false,
  outline = false,
  large = false,
  small = false,
  leftIcon,
  rightIcon,
  children,
  className,
  onClick,
  ...passProps
}) {
  let Comp = "button";

  const props = { onClick, ...passProps };

  //Remove event listeners
  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith("on") && typeof props[key] === "function") {
        delete props[key];
      }
    });
  }

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }

  const classes = cx("wrapper", {
    [className]: className,
    primary,
    outline,
    small,
    large,
    text,
    disabled,
    rounded,
  });
  return (
    <Comp className={classes} {...props}>
      {leftIcon && <span className={cx("icon")}>{leftIcon}</span>}
      <span className={cx('title')}> {children} </span>
    </Comp>
  );
}

Button.propTypes = {
  to : PropTypes.string,
  href : PropTypes.string,
  text : PropTypes.bool,
  rounded : PropTypes.bool,
  disabled : PropTypes.bool,
  primary : PropTypes.bool,
  outline : PropTypes.bool,
  large : PropTypes.bool,
  small : PropTypes.bool,
  leftIcon : PropTypes.node, // node chỉ cần render ra được,không phải hàm
  rightIcon : PropTypes.node,
  children : PropTypes.node.isRequired,
  className : PropTypes.string,
  onClick : PropTypes.func,
}

export default Button;
