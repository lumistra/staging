import classNames from 'classnames';

type Props = {
  identifier: string
  children: JSX.Element | JSX.Element[]
  className?: string
};

function TextMask(props: Props) {
  return (
    <div className={classNames(props.identifier, props.className)}>
      {props.children}
    </div>
  );
}

export default TextMask;
