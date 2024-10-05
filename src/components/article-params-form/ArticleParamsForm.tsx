import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useRef } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormType = {
	isOpen: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ArticleParamsForm = (props: ArticleParamsFormType) => {
	// Фунуция изменения состояния открытия формы
	const toggleOpen = () => props.setOpen(!props.isOpen);

	// Хук для хранения разметки aside формы
	const ref = useRef<HTMLDivElement | null>(null);

	// Кастомный хук для закрытия при клике вне экрана
	useOutsideClickClose({
		isOpen: props.isOpen,
		rootRef: ref,
		onClose: () => toggleOpen,
		onChange: props.setOpen,
	});

	return (
		<>
			<ArrowButton isOpen={props.isOpen} onClick={toggleOpen} />
			<aside
				ref={ref}
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
