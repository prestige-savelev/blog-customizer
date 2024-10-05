import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormType = {
	isOpen: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ArticleParamsForm = (props: ArticleParamsFormType) => {
	// Фунуция изменения состояния открытия формы
	const toggleOpen = () => props.setOpen(!props.isOpen);

	return (
		<>
			<ArrowButton isOpen={props.isOpen} onClick={toggleOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: props.isOpen,
				})}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
