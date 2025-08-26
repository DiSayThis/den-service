// scripts/convert-to-webp.js

import { promises as fs } from 'fs';
import path from 'path';
import glob from 'fast-glob';
import sharp from 'sharp';

async function run() {
	// Берём все JPG/PNG/JPEG из public и всех подпапок
	const files = await glob('public/**/*.{jpg,jpeg,png}');

	for (const file of files) {
		const ext = path.extname(file); // .jpg или .png
		const outPath = file.replace(ext, '.webp'); // заменяем расширение на .webp

		// создаём папку на всякий случай (на Windows иногда надо)
		await fs.mkdir(path.dirname(outPath), { recursive: true });

		// конвертируем в WebP с качеством 80
		await sharp(file)
			.resize({ width: 2000, height: 2000, fit: 'inside' }) // масштабируем по большему размеру, сохраняя пропорции
			.webp({ quality: 100 })
			.toFile(outPath);

		// удаляем старый файл
		await fs.unlink(file);

		console.log(`✔ ${file} → ${outPath}`);
	}
}

run().catch(console.error);
