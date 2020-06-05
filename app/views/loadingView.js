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
                    <img src="/loading-desktop.gif" alt="Loading" class="loading-image desktop">
                    <img src="/loading-mobile.gif" alt="Loading" class="loading-image mobile">
                </div>
            </div>
    </body>
  `;
  document.body.outerHTML = html;
}