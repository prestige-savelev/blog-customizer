import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
	ArticleStateType,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useClose } from './hooks/useClose';

type ArticleParamsFormType = {
	setStyleData: (styleData: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormType) => {
	// Состояние формы
	const [data, setData] = useState(defaultArticleState);

	// Состояние открытия формы
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	// Фунуция изменения состояния открытия формы
	const toggleOpen = () => setIsMenuOpen(!isMenuOpen);

	// Хук для хранения разметки aside формы
	const ref = useRef<HTMLDivElement | null>(null);

	// Кастомный хук для закрытия при клике вне экрана
	useClose({
		isOpen: isMenuOpen,
		onClose: toggleOpen,
		rootRef: ref,
	});

	// Изменения состояния формы

	// Изменение состояния шрифта
	const changeFonts = (option: OptionType) => {
		setData({
			...data,
			fontFamilyOption: option,
		});
	};

	// Изменение состояния размера шрифта
	const changeFontsSize = (option: OptionType) => {
		setData({
			...data,
			fontSizeOption: option,
		});
	};

	// Изменение состояния цвета шрифта
	const changeFontsColor = (option: OptionType) => {
		setData({
			...data,
			fontColor: option,
		});
	};

	// Изменение состояния цвета фона
	const changeBackgroundColor = (option: OptionType) => {
		setData({
			...data,
			backgroundColor: option,
		});
	};

	// Изменение состояния ширины контента
	const changeWidthContent = (option: OptionType) => {
		setData({
			...data,
			contentWidth: option,
		});
	};

	// Функция изменения состояния страницы стилей
	const changeStyle = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		props.setStyleData(data);
	};

	// Функция сброса состояния стилей
	const removeStyle = () => {
		setData(defaultArticleState);
		props.setStyleData(defaultArticleState);
	};

	// Возврат разметки формы
	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={toggleOpen} />
			<aside
				ref={ref}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form className={styles.form} onSubmit={changeStyle}>
					<Text as='h2' size={31} weight={800}>
						Задайте параметры
					</Text>
					<Select
						onChange={changeFonts}
						title='шрифт'
						selected={data.fontFamilyOption}
						options={fontFamilyOptions}
					/>
					<RadioGroup
						onChange={changeFontsSize}
						title='размер шрифта'
						selected={data.fontSizeOption}
						options={fontSizeOptions}
						name={data.fontSizeOption.className}
					/>
					<Select
						onChange={changeFontsColor}
						title='цвет шрифта'
						selected={data.fontColor}
						options={fontColors}
						placeholder={data.fontColor.title}
					/>
					<Separator />
					<Select
						onChange={changeBackgroundColor}
						title='цвет фона'
						selected={data.backgroundColor}
						options={backgroundColors}
						placeholder={data.fontColor.title}
					/>
					<Select
						onChange={changeWidthContent}
						title='ширина контента'
						selected={data.contentWidth}
						options={contentWidthArr}
						placeholder={data.fontColor.title}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={removeStyle}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
