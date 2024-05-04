import dynamic from 'next/dynamic';

const navigation = dynamic(() => import('@/components/navigation/Navigation'));

const components = {
  navigation,
};

export default components;
