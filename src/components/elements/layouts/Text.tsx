import classNames from 'classnames';
import style from '@/styles/layouts.module.scss';

type Props = {
  align: 'left' | 'right'
  text: string
};

export default function Text(props: Props) {
  return (
    <div className={style.textWrapper}>
      <div className={classNames({
        [style.alignLeft]: props.align === 'left',
        [style.alignRight]: props.align === 'right',
      })}
      >
        {props.text}
      </div>
    </div>
  );
}
