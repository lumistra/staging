import Chat from '@/assets/svg/chat.svg';
import Email from '@/assets/svg/email.svg';
import Facebook from '@/assets/svg/facebook.svg';
import Geometry from '@/assets/svg/geometry.svg';
import Instagram from '@/assets/svg/instagram.svg';
import LinkedIn from '@/assets/svg/linkedin.svg';
import Rocket from '@/assets/svg/rocket.svg';
import { Icons } from '@/types/shared';

export const email = 'info@studiolumistra.com';

export const keywords = 'Creative Design, Graphic Design, Web Design, Branding, Logo Design, Digital Marketing, UI/UX Design, Visual Identity, Advertising, Art Direction, Print Design, Motion Graphics, Photography, Illustration, Creative Agency, Marketing Strategy, Packaging Design, Brand Development, Interactive Design, Creative Solutions';

export const socials = {
  [Icons.instagram]: <Instagram />,
  [Icons.facebook]: <Facebook />,
  [Icons.linkedin]: <LinkedIn />,
  [Icons.email]: <Email />,
  [Icons.chat]: <Chat />,
  [Icons.geometry]: <Geometry />,
  [Icons.rocket]: <Rocket />,
};
