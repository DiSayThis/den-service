'use client';

// если нужен интерактивный компонент
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

interface IMarkdownProps {
	content: string;
}

export default function MarkdownRenderer({ content }: IMarkdownProps) {
	return <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{content}</ReactMarkdown>;
}
