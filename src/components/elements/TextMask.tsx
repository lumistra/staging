import classNames from 'classnames';

type Props = {
  animationClass: string
  children: JSX.Element | JSX.Element[]
  className?: string
};

function TextMask(props: Props) {
  return (
    <div className={classNames(props.animationClass, props.className)}>
      {props.children}
    </div>
  );
}

export default TextMask;
