(() => {
  const chaveAviso = 'ffsm-aviso-construcao-fechado';
  try {
    if (sessionStorage.getItem(chaveAviso) === 'sim') return;
  } catch {
    // O aviso continua funcionando quando o armazenamento da sessão não está disponível.
  }

  const scriptAtual = document.currentScript;
  const imagemObras = new URL('obras.png', scriptAtual.src).href;
  const estilos = document.createElement('style');
  estilos.textContent = `
    .aviso-construcao-fundo{position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(0,0,0,.72);}
    .aviso-construcao{width:min(460px,100%);max-height:calc(100vh - 40px);overflow:auto;padding:28px 30px 24px;background:#fff;color:#222;border-top:6px solid #b2082a;box-shadow:0 16px 48px rgba(0,0,0,.35);text-align:center;}
    .aviso-construcao img{display:block;width:108px;height:128px;object-fit:contain;margin:0 auto 18px;}
    .aviso-construcao h2{margin:0 0 12px;color:#910b26;font-size:25px;}
    .aviso-construcao p{margin:0;font-size:15px;line-height:1.6;}
    .aviso-construcao button{min-width:132px;margin-top:22px;padding:10px 18px;border:0;border-radius:3px;background:#910b26;color:#fff;font-size:14px;font-weight:bold;cursor:pointer;}
    .aviso-construcao button:disabled{background:#888;cursor:wait;}
    .aviso-construcao button:focus-visible{outline:3px solid #c81438;outline-offset:3px;}
    @media(max-width:480px){.aviso-construcao{padding:24px 20px 20px;}.aviso-construcao img{width:90px;height:108px;}.aviso-construcao h2{font-size:22px;}}
  `;
  document.head.append(estilos);

  const fundo = document.createElement('div');
  fundo.className = 'aviso-construcao-fundo';
  fundo.innerHTML = `
    <section class="aviso-construcao" role="dialog" aria-modal="true" aria-labelledby="titulo-aviso-construcao" aria-describedby="texto-aviso-construcao">
      <img src="${imagemObras}" alt="Símbolo de pessoa trabalhando, indicando que o site está em construção">
      <h2 id="titulo-aviso-construcao">Site em construção</h2>
      <p id="texto-aviso-construcao">Algumas páginas ainda não fornecem informações completas sobre os times, pois o site continua em desenvolvimento. Volte mais tarde.</p>
      <button type="button" disabled>Fechar (5s)</button>
    </section>
  `;
  document.body.append(fundo);
  document.body.style.overflow = 'hidden';

  const botaoFechar = fundo.querySelector('button');
  let segundosRestantes = 5;
  const contagem = window.setInterval(() => {
    segundosRestantes -= 1;
    if (segundosRestantes > 0) {
      botaoFechar.textContent = `Fechar (${segundosRestantes}s)`;
      return;
    }
    window.clearInterval(contagem);
    botaoFechar.disabled = false;
    botaoFechar.textContent = 'Fechar aviso';
    botaoFechar.focus();
  }, 1000);

  botaoFechar.addEventListener('click', () => {
    try {
      sessionStorage.setItem(chaveAviso, 'sim');
    } catch {
      // O aviso fecha mesmo quando o armazenamento da sessão não está disponível.
    }
    window.clearInterval(contagem);
    document.body.style.overflow = '';
    fundo.remove();
  });
})();
