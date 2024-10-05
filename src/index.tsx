import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// Состояние открытия формы
	const [open, setOpen] = useState(false);

	// Состояние страницы стилей
	const [styleData, setStyleData] = useState(defaultArticleState);

	// Возврат разметки страницы
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': styleData.fontFamilyOption.value,
					'--font-size': styleData.fontSizeOption.value,
					'--font-color': styleData.fontColor.value,
					'--container-width': styleData.contentWidth.value,
					'--bg-color': styleData.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={open}
				setOpen={setOpen}
				setStyleData={setStyleData}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
