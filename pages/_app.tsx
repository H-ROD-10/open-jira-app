import type { AppProps } from 'next/app'

import createEmotionCache from '../src/CacheEmotion';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider, EmotionCache } from '@emotion/react';
import Head from 'next/head';
import { CssBaseline } from '@mui/material';

import { themeLight, themeDark  } from '../src/components/theme'; //themeDark
import { UIProvider } from '../src/context/ui';
import EntriesProvider from '../src/context/entries/EntriesProvider';

import '../styles/globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
//import theme from '../src/components/theme/theme';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={themeDark}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </CacheProvider>
  );
}