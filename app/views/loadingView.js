import locale from '../config/locale/i18n';

export default function setViewToLoaddingScreen() {
  createViewInHtml();
}

function createViewInHtml() {
  const i18n = locale();

  const html = `
    <body class="body-loader">			
			<header role="banner" class="header-loading"></header>		
			<div role="main" class="main-loader">
				<div class="row">
					<div class="loader-bl">
						<div class="loader-counter">
            <!-- <span class="loader-text">%</span> -->
						</div>
						<h1 class="loader-title">${i18n.loading.title}</h1>
						<p class="loader-desc">${i18n.loading.description}</p>
					</div>
				</div>
			</div>
    </body>
  `;
  document.body.outerHTML = html;
}