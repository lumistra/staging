import classNames from 'classnames';
import useTranslations from '@/hooks/useTranslations';

export type CursorPosition = { x: number, y: number } | null;

type Props = {
  className?: string
  cursorPosition: CursorPosition
  show: boolean
};

export default function SeeMore(props: Props) {
  const { t } = useTranslations();

  return (
    <div
      className={classNames('see-more-modal', props.className, {
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
      <span>{t('globals.see_more')}</span>
    </div>
  );
}
