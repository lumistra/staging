import dynamic from 'next/dynamic';

const navigation = dynamic(() => import('./navigation/Navigation'));

const components = {
  navigation,
};

export default components;
