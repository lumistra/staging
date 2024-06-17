import classNames from 'classnames';

type Props = {
  className: string,
  onClick: () => void
};

export default function Menu(props: Props) {
  return (
    <div className={classNames('menu-icon', props.className)} onClick={props.onClick}>
      <div className="menu-line-wrapper menu-line-1">
        <hr className="menu-line" />
        <hr className="menu-line" />
      </div>
      <div className="menu-line-wrapper menu-line-2">
        <hr className="menu-line" />
      </div>
    </div>
  );
}
