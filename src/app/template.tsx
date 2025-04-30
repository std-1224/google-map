'use client';

import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

export default function RootTemplate({ children }: PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}
