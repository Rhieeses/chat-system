import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from '@nextui-org/react';
interface ModalSchema {
	openModal: boolean;
	message: string;
}
export default function SuccessModal({ openModal, message }: ModalSchema) {
	return (
		<Modal isOpen={openModal}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className='flex flex-col gap-1'>Modal Title</ModalHeader>
						<ModalBody>
							<h1>{message}</h1>
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
