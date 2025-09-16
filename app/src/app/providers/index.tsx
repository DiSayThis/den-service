import Script from 'next/script';

import { ToastProvider } from '@/shared/hooks/useToasts';
import ContainerLayout from '@/shared/ui/ContainerLayout';

import ReactQueryProvider from './ReactQueryProvider';
import { TelegramProvider } from './TelegramProvider';
import { ThemeProvider } from './theme-provider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider>
			<body>
				<ToastProvider>
					<ReactQueryProvider>
						<TelegramProvider>
							<ContainerLayout>{children}</ContainerLayout>
							<div id={'portal-modal'} />
						</TelegramProvider>
						<Script id="yandex-metrika" strategy="afterInteractive">
							{`
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {
                	if (document.scripts[j].src === r) { return; }
                }
                k=e.createElement(t),a=e.getElementsByTagName(t)[0];
                k.async=1;k.src=r;a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=104166398', 'ym');

            ym(104166398, 'init', {
			ssr:true, 
			defer: true,
			webvisor:true, 
			clickmap:true, 
			ecommerce:"dataLayer", 
			accurateTrackBounce:true, 
			trackLinks:true
			});
        `}
						</Script>

						<noscript>
							<div>
								<img
									src="https://mc.yandex.ru/watch/104166398"
									style={{ position: 'absolute', left: '-9999px' }}
									alt=""
								/>
							</div>
						</noscript>
					</ReactQueryProvider>
				</ToastProvider>
			</body>
		</ThemeProvider>
	);
};
