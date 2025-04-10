import classNames from 'classnames';
import useTranslations from '@/hooks/useTranslations';

export type CursorPosition = { x: number, y: number } | null;

type Props = {
  className?: string
  cursorPosition: CursorPosition
  keyword?: string
  show: boolean
};

export default function CursorTracker(props: Props) {
  const { t } = useTranslations();

  return (
    <div
      className={classNames('cursor-tracker-modal', props.className, {
        active: props.show,
      })}
      style={{
        position: 'fixed',
        ...(props.cursorPosition && {
          left: props.cursorPosition.x,
          top: props.cursorPosition.y,
        }),
      }}
    >
      <span>{props.keyword || t('globals.see_more')}</span>
    </div>
  );
}
