import {
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
} from '@/constants/articleProps';
import { ArrowButton } from '@/ui/arrow-button';
import { Button } from '@/ui/button';
import { RadioGroup } from '@/ui/radio-group';
import { Select } from '@/ui/select';
import { useOutsideClickClose } from '@/ui/select/hooks/useOutsideClickClose';
import { Separator } from '@/ui/separator/Separator';
import { Text } from '@/ui/text';
import { clsx } from 'clsx';
import { useState, useRef } from 'react';

import styles from './ArticleParamsForm.module.scss';

type ArticleSettings = typeof defaultArticleState;

type Props = {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onApply: (settings: ArticleSettings) => void;
  initialSettings: ArticleSettings;
};

export const ArticleParamsForm = ({
  isOpen,
  onToggle,
  onClose,
  onApply,
  initialSettings,
}: Props): React.JSX.Element => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  useOutsideClickClose({
    isOpen,
    rootRef,
    onChange: onClose,
  });

  const [selectedFont, setSelectedFont] = useState(initialSettings.fontFamilyOption);
  const [selectedFontSize, setSelectedFontSize] = useState(
    initialSettings.fontSizeOption
  );
  const [selectedFontColor, setSelectedFontColor] = useState(initialSettings.fontColor);
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
    initialSettings.backgroundColor
  );
  const [selectedContentWidth, setSelectedContentWidth] = useState(
    initialSettings.contentWidth
  );

  const handleApply = (): void => {
    const newSettings: ArticleSettings = {
      fontFamilyOption: selectedFont,
      fontSizeOption: selectedFontSize,
      fontColor: selectedFontColor,
      backgroundColor: selectedBackgroundColor,
      contentWidth: selectedContentWidth,
    };
    onApply(newSettings);
    onClose();
  };

  const handleReset = (): void => {
    setSelectedFont(defaultArticleState.fontFamilyOption);
    setSelectedFontSize(defaultArticleState.fontSizeOption);
    setSelectedFontColor(defaultArticleState.fontColor);
    setSelectedBackgroundColor(defaultArticleState.backgroundColor);
    setSelectedContentWidth(defaultArticleState.contentWidth);
    onApply(defaultArticleState);
  };

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={onToggle} />
      <aside
        ref={rootRef}
        className={clsx(styles.container, { [styles.container_open]: isOpen })}
      >
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <Text size={31} weight={800} uppercase={true}>
            Задайте параметры
          </Text>
          <Select
            title="Шрифт"
            placeholder="Выберите шрифт"
            options={fontFamilyOptions}
            selected={selectedFont}
            onChange={(newOption) => setSelectedFont(newOption)}
          />
          <RadioGroup
            name="sizes"
            options={fontSizeOptions}
            title="Размер шрифта"
            selected={selectedFontSize}
            onChange={setSelectedFontSize}
          />
          <Select
            title="цвет шрифта"
            options={fontColors}
            selected={selectedFontColor}
            onChange={(newOption) => setSelectedFontColor(newOption)}
          />
          <Separator />
          <Select
            title="цвет фона"
            options={backgroundColors}
            selected={selectedBackgroundColor}
            onChange={(newOption) => setSelectedBackgroundColor(newOption)}
          />
          <Select
            title="ширина контента"
            options={contentWidthArr}
            selected={selectedContentWidth}
            onChange={(newOption) => setSelectedContentWidth(newOption)}
          />
          <div className={styles.bottomContainer}>
            <Button
              title="Сбросить"
              htmlType="reset"
              type="clear"
              onClick={handleReset}
            />
            <Button
              title="Применить"
              htmlType="submit"
              type="apply"
              onClick={handleApply}
            />
          </div>
        </form>
      </aside>
    </>
  );
};
