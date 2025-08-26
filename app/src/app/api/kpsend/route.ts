import { NextResponse } from 'next/server';

export const config = {
	api: {
		bodyParser: false,
	},
};

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const rawChatId = process.env.TELEGRAM_CHAT_ID || '';
// Если есть запятая, разбиваем на массив, иначе оставляем как один элемент
const CHAT_IDS = rawChatId.includes(',')
	? rawChatId.split(',').map((id) => id.trim())
	: [rawChatId];

export async function POST(req: Request) {
	try {
		const formData = await req.formData();

		const phone = formData.get('phone')?.toString() || null;
		const file = formData.get('file') as File | null;
		const username = formData.get('username')?.toString() || null;
		const type = formData.get('type')?.toString() || null;

		const specialistName = formData.get('specialist.name')?.toString() || null;
		const specialistHours = formData.get('specialist.hours')?.toString() || null;
		const specialistPrice = formData.get('specialist.price')?.toString() || null;

		if (!phone) {
			return NextResponse.json({ success: false, error: 'Телефон не указан' }, { status: 400 });
		}

		// Собираем сообщение динамически
		let textMessage = `Новый запрос ${type ? `из формы "${type}"` : ':'}\n`;
		textMessage += `📞 Телефон: ${phone}\n`;
		if (username) textMessage += `👤 Telegram: @${username}\n`;
		if (specialistName) textMessage += `💼 Специалист: ${specialistName}\n`;
		if (specialistHours && specialistHours !== '0') textMessage += `⏱ Часы: ${specialistHours}\n`;
		if (specialistPrice && specialistPrice !== '0')
			textMessage += `💰 Стоимость: ${specialistPrice} ₽\n`;

		// Создаем массив промисов для всех чат ID
		const sendPromises = CHAT_IDS.map(async (chatId) => {
			// Отправка текста
			const msgPromise = fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					chat_id: chatId,
					text: textMessage,
					parse_mode: 'Markdown',
				}),
			});

			// Отправка файла (если есть)
			let filePromise: Promise<Response> | null = null;
			if (file) {
				const arrayBuffer = await file.arrayBuffer();
				const buffer = Buffer.from(arrayBuffer);

				const tgForm = new FormData();
				tgForm.append('chat_id', chatId);

				if (file.type.startsWith('image/')) {
					tgForm.append('photo', new Blob([buffer]), file.name);
					filePromise = fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
						method: 'POST',
						body: tgForm,
					});
				} else {
					tgForm.append('document', new Blob([buffer]), file.name);
					filePromise = fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
						method: 'POST',
						body: tgForm,
					});
				}
			}

			// Ждём оба промиса одновременно
			await Promise.all([msgPromise, filePromise].filter(Boolean));
		});

		// Ждем отправки для всех чат ID
		await Promise.all(sendPromises);

		return NextResponse.json({ success: true });
	} catch (err) {
		console.error('Ошибка обработки формы:', err);
		return NextResponse.json({ success: false, error: 'Ошибка сервера' }, { status: 500 });
	}
}
