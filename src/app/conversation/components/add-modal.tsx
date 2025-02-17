'use client';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
	Tabs,
	Tab,
	Input,
	Button,
} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import SuggestionCard from './suggestion-card';

interface AddUserModalProps {
	isAddUserOpen: boolean;
	handleOpenAdd: (value: boolean) => void;
}
const AddUserModal = ({ isAddUserOpen, handleOpenAdd }: AddUserModalProps) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	useEffect(() => {
		if (isAddUserOpen) {
			onOpen();
		}
	}, [isAddUserOpen, onOpen]);
	return (
		<Modal
			hideCloseButton
			placement='top'
			size='lg'
			isOpen={isAddUserOpen}
			onOpenChange={onOpenChange}>
			<ModalContent>
				<>
					<ModalHeader className='flex flex-col gap-5'>
						<div className='flex flex-col gap-2'>
							<h1 className='font-medium text-3xl'>People</h1>
						</div>
					</ModalHeader>
					<ModalBody>
						<div className='flex flex-col gap-3'>
							<SuggestionCard />
						</div>
					</ModalBody>
					<ModalFooter>
						<Button
							className='w-1/2'
							size='lg'
							variant='bordered'
							onPress={() => handleOpenAdd(false)}>
							Close
						</Button>
					</ModalFooter>
				</>
			</ModalContent>
		</Modal>
	);
};

export default React.memo(AddUserModal);
