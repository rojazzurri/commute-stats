import classNames from "classnames";
import React, { ForwardedRef, forwardRef, useMemo } from "react";
import { Colors } from "../types/colors";
import buttonTheme from "./button.theme";

type BaseProps = {
  color?: Colors;
};

type InnerButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  BaseProps;

type InnerAnchorProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  type: "link";
  disabled?: boolean;
} & BaseProps;

export type ButtonProps = InnerButtonProps | InnerAnchorProps;

function checkIsLink(props: ButtonProps): props is InnerAnchorProps {
  return props.type === "link";
}

function checkIsButton(props: ButtonProps): props is InnerButtonProps {
  return props.type !== "link";
}

const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      children,
      className,
      disabled,
      color = "blue",
      ...restProps
    } = props;

    const classes = useMemo(
      () =>
        classNames(
          buttonTheme.base,
          buttonTheme.colors[color],
          disabled && buttonTheme.disabled,
          className,
        ),
      [className, color, disabled],
    );

    if (checkIsLink(restProps)) {
      return (
        <a
          ref={ref as ForwardedRef<HTMLAnchorElement>}
          className={classNames(classes, {
            "pointer-events-none": disabled,
          })}
          {...restProps}
        >
          {children}
        </a>
      );
    }

    if (checkIsButton(restProps)) {
      return (
        <button
          ref={ref as ForwardedRef<HTMLButtonElement>}
          type="button"
          className={classes}
          disabled={disabled}
          {...restProps}
        >
          {children}
        </button>
      );
    }

    return null;
  },
);

const classes = {};

export default Button;
