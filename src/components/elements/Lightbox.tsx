import { cloneElement, useRef } from 'react';
import Close from '@/assets/svg/close.svg';
import Media from '@/components/elements/Media';
import type { MediaData } from '@/types/shared';

type Props = {
  image: MediaData
  children: any
};

export default function Lightbox(props: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleLightboxToggle = () => {
    if (!dialogRef.current) return;
    if (dialogRef.current.open) return dialogRef.current.close();

    return dialogRef.current?.showModal();
  };

  return (
    <>
      {cloneElement(props.children, {
        ...props.children.props,
        onClick: handleLightboxToggle,
      })}
      <dialog ref={dialogRef} className="lightbox-wrapper">
        <Close className="close-icon" onClick={handleLightboxToggle} />
        <Media src={props.image.filename} alt={props.image.alt} />
      </dialog>
    </>
  );
}
