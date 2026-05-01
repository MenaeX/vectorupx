// Превью HTML-шаблона письма «Восстановление доступа в VectorUpX».
// Источник правды — `src/lib/email.ts` в репо vectorupx-team (Worker).
// При правке шаблона там — обнови дубликат тут.
//
// Рендерится в iframe srcDoc, чтобы стили email не наследовались от
// лендинга и письмо выглядело так, как его увидит реальный получатель.

const DEMO_URL =
  "https://vectorupx.com/reset-password?token=demo123abc456def789012345678";

const html = `<!doctype html>
<html lang="ru">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f5f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1c1917;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f4;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:12px;padding:32px;">
        <tr><td>
          <p style="margin:0 0 16px 0;font-size:14px;color:#78716c;letter-spacing:0.08em;text-transform:uppercase;">VectorUpX</p>
          <h1 style="margin:0 0 16px 0;font-size:22px;font-weight:600;line-height:1.3;">Восстановление доступа</h1>
          <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;">Здравствуйте!</p>
          <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;">Вы запросили сброс пароля для входа в VectorUpX. Чтобы установить новый пароль, нажмите кнопку:</p>
          <p style="margin:24px 0;text-align:center;">
            <a href="${DEMO_URL}" style="display:inline-block;background:#fb923c;color:#1c1917;text-decoration:none;font-weight:500;padding:12px 28px;border-radius:999px;font-size:15px;">Установить новый пароль</a>
          </p>
          <p style="margin:0 0 16px 0;font-size:14px;line-height:1.6;color:#57534e;">Или скопируйте ссылку в браузер:<br><a href="${DEMO_URL}" style="color:#c2410c;word-break:break-all;">${DEMO_URL}</a></p>
          <p style="margin:24px 0 16px 0;font-size:14px;line-height:1.6;color:#57534e;">Ссылка действует 1 час. Если вы не запрашивали сброс — просто проигнорируйте это письмо, ваш пароль не изменится.</p>
          <p style="margin:24px 0 0 0;font-size:14px;line-height:1.6;color:#57534e;">Если возникли вопросы — ответьте на это письмо, отвечу лично.</p>
          <p style="margin:24px 0 0 0;font-size:14px;line-height:1.6;color:#1c1917;">— Андрей Меньшиков<br><span style="color:#78716c;">VectorUpX</span></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

export default function ResetEmailPreviewPage() {
  return (
    <main className="min-h-screen bg-stone-950 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-baseline justify-between">
          <div>
            <h1 className="text-xl font-medium text-white">
              Превью письма: восстановление пароля
            </h1>
            <p className="mt-1 text-sm text-white/50">
              Источник: <code className="text-white/70">src/lib/email.ts</code>{" "}
              в Worker. Тема: «Восстановление доступа в VectorUpX». От: Андрей
              Меньшиков &lt;andrey@vectorupx.com&gt;.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl">
          <iframe
            srcDoc={html}
            title="Email preview"
            className="block h-[760px] w-full border-0 bg-white"
          />
        </div>

        <p className="mt-4 text-xs text-white/40">
          Превью использует демо-токен. Реальное письмо генерится Worker'ом при
          POST /api/auth/forgot.
        </p>
      </div>
    </main>
  );
}
