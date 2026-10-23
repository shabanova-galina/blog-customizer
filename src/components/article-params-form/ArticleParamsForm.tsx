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

import type { OptionType } from '@/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type Props = {
  onApply: (settings: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({ onApply }: Props): React.JSX.Element => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const onToggle = (): void => setIsFormOpen((prev) => !prev);
  const closeForm = (): void => setIsFormOpen(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  useOutsideClickClose({
    isOpen: isFormOpen,
    rootRef,
    onChange: closeForm,
  });

  const [formState, setFormState] =
    useState<typeof defaultArticleState>(defaultArticleState);

  const updateFormField = (
    field: keyof typeof defaultArticleState
  ): ((value: OptionType) => void) => {
    return (value: OptionType) => {
      setFormState((prev) => ({
        ...prev,
        [field]: value,
      }));
    };
  };

  const handleApply = (): void => {
    onApply(formState);
    closeForm();
  };

  const handleReset = (): void => {
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  return (
    <div ref={rootRef}>
      <ArrowButton isOpen={isFormOpen} onClick={onToggle} />
      <aside className={clsx(styles.container, { [styles.container_open]: isFormOpen })}>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <Text size={31} weight={800} uppercase={true}>
            Задайте параметры
          </Text>
          <Select
            title="Шрифт"
            placeholder="Выберите шрифт"
            options={fontFamilyOptions}
            selected={formState.fontFamilyOption}
            onChange={updateFormField('fontFamilyOption')}
          />
          <RadioGroup
            name="sizes"
            options={fontSizeOptions}
            title="Размер шрифта"
            selected={formState.fontSizeOption}
            onChange={updateFormField('fontSizeOption')}
          />
          <Select
            title="цвет шрифта"
            options={fontColors}
            selected={formState.fontColor}
            onChange={updateFormField('fontColor')}
          />
          <Separator />
          <Select
            title="цвет фона"
            options={backgroundColors}
            selected={formState.backgroundColor}
            onChange={updateFormField('backgroundColor')}
          />
          <Select
            title="ширина контента"
            options={contentWidthArr}
            selected={formState.contentWidth}
            onChange={updateFormField('contentWidth')}
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
    </div>
  );
};
