import dynamic from 'next/dynamic';

const navigation = dynamic(() => import('@/components/containers/navigation/Navigation'));

const components = {
  navigation,
};

export default components;
