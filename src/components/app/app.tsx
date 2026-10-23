import { defaultArticleState } from '@/constants/articleProps.ts';
import { clsx } from 'clsx';
import { useState, type CSSProperties } from 'react';

import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article/Article';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  const [currentSettings, setCurrentSettings] = useState(defaultArticleState);
  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': currentSettings.fontFamilyOption.value,
          '--font-size': currentSettings.fontSizeOption.value,
          '--font-color': currentSettings.fontColor.value,
          '--container-width': currentSettings.contentWidth.value,
          '--bg-color': currentSettings.backgroundColor.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm onApply={setCurrentSettings} />
      <Article />
    </main>
  );
};
