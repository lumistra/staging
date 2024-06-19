type Props = {
  identifier: string
  children: JSX.Element
};

function TextMask(props: Props) {
  return (
    <div className={props.identifier}>
      {props.children}
    </div>
  );
}

export default TextMask;
