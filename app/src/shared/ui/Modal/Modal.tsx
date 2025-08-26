/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import type { FC, ReactNode } from 'react';
import clsx from 'clsx';
import { HTMLMotionProps } from 'motion/react';

import ButtonCustom from '../ButtonCustom';
import Card from '../Card';
import MaterialIcon from '../icons/MaterialIcon';
import styles from './Modal.module.scss';

export interface IModalProps extends HTMLMotionProps<'div'> {
	isOpen: boolean;
	onClose?: () => void;
	children?: ReactNode;
	parentNode?: HTMLElement;
	outsideClickClose?: boolean;
}

/* ---------------- ModalManager (module scope) ----------------
   Хранит стек модалок, управляет единым keydown и блокировкой скролла.
   Реализация проста и устойчива к React.StrictMode (используем id).
-------------------------------------------------------------- */
type ModalEntry = { id: string; onClose: () => void };

const modalStack: ModalEntry[] = [];
let globalKeyInstalled = false;

const installGlobalKey = () => {
	if (globalKeyInstalled) return;
	document.addEventListener('keydown', globalKeyHandler);
	globalKeyInstalled = true;
};

const uninstallGlobalKey = () => {
	if (!globalKeyInstalled) return;
	document.removeEventListener('keydown', globalKeyHandler);
	globalKeyInstalled = false;
};

function globalKeyHandler(e: KeyboardEvent) {
	if (e.key !== 'Escape') return;
	const top = modalStack[modalStack.length - 1];
	if (top?.onClose) {
		// стоп propagation не обязателен здесь — onClose может сам остановить если нужно
		top.onClose();
	}
}

function registerModal(id: string, onClose: () => void) {
	modalStack.push({ id, onClose });
	// ставим один глобальный хендлер
	installGlobalKey();
	// блокируем прокрутку (пока есть хотя бы одна модалка)
	document.body.style.overflow = 'hidden';
}

function unregisterModal(id: string) {
	const idx = modalStack.findIndex((m) => m.id === id);
	if (idx !== -1) modalStack.splice(idx, 1);

	if (modalStack.length === 0) {
		// снимаем глобальный хендлер и разблокируем прокрутку
		uninstallGlobalKey();
		document.body.style.overflow = '';
	}
}

function isTopModal(id: string) {
	return modalStack.length > 0 && modalStack[modalStack.length - 1].id === id;
}

/* ----------------- Modal component ----------------- */
const Modal: FC<IModalProps> = ({
	isOpen,
	onClose,
	children,
	parentNode,
	outsideClickClose = true,
	...rest
}) => {
	// стабильный id для данной инстансы модалки
	const idRef = useRef<string>(`modal_${Math.random().toString(36).slice(2)}`);
	// храним onClose в ref, чтобы всегда вызывать актуальную функцию без перерегистрации
	const onCloseRef = useRef(onClose);
	onCloseRef.current = onClose;

	const overlayRef = useRef<HTMLDivElement | null>(null);

	// Регистрация/отписка в стек при открытии/закрытии
	useEffect(() => {
		if (isOpen) {
			// регистрируем с обёрткой, чтобы вызывать актуальный onClose
			registerModal(idRef.current, () => {
				onCloseRef.current?.();
			});
		}
		return () => {
			// убедимся что удаляем запись даже если overlayRef уже null — ключом служит id

			unregisterModal(idRef.current);
		};
		// intentionally depends only on isOpen (idRef неизменен)
	}, [isOpen]);

	// Клик по Overlay: закрываем только если это верхняя модалка и outsideClickClose === true
	const handleClickOutside = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (e.target === overlayRef.current && outsideClickClose && isTopModal(idRef.current)) {
				onCloseRef.current?.();
			}
		},
		[outsideClickClose],
	);

	if (!isOpen) return null;

	return ReactDOM.createPortal(
		<div
			ref={overlayRef}
			className={styles.modal__overlay}
			onClick={handleClickOutside}
			aria-modal="true"
			role="dialog"
			tabIndex={-1}
		>
			<div className={styles.modal__close}>
				<ButtonCustom customType="secondary" onClick={onClose}>
					<MaterialIcon name="MdClose" />
				</ButtonCustom>
			</div>
			<Card
				{...rest}
				className={clsx(styles.modal__content, rest.className)}
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</Card>
		</div>,
		parentNode ?? document.body,
	);
};

export default Modal;
