import React from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export const getStaticProps = async () => {
	const spec = createSwaggerSpec({
		openApiVersion: '3.0.0',
		title: 'TP Cloud API',
		version: '1.0.0',
		apiFolder: 'pages/api',
	});

	return {
		props: {
			spec,
		},
	};
};

export default function ApiDoc({ spec }) {
	return <SwaggerUI spec={spec} />;
}