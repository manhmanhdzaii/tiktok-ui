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

export default Button;
