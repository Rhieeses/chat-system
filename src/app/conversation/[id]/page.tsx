'use client';
import MessagesContent from './components/messages';
import Layout from '../../components/layout/layout';
import { useParams } from 'next/navigation';
import React from 'react';

export default function MessengerContent() {
	const params = useParams();
	const userId = params.id;

	if (!userId) {
		return <p>No userId found</p>;
	}
	return (
		<Layout>
			<MessagesContent receiverIdUrl={userId} />
		</Layout>
	);
}
