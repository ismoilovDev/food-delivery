import { useAuthPage } from "./usePage";

export default function AuthPage() {
  const { status, errorMsg, retry, t } = useAuthPage();

  if (status === "no-telegram") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
        <div className="text-6xl mb-4">✈️</div>
        <h1 className="text-xl font-semibold text-gray-800 mb-2">Telegram</h1>
        <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
          {t.auth.telegramRequired}
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-xl font-semibold text-gray-800 mb-2">
          {t.auth.authError}
        </h1>
        <p className="text-gray-500 text-sm mb-6 max-w-xs leading-relaxed">
          {errorMsg}
        </p>
        <button
          onClick={retry}
          className="px-8 py-3 bg-orange-500 text-white rounded-2xl font-semibold text-sm active:scale-95 transition-transform shadow-lg shadow-orange-200"
        >
          {t.auth.retry}
        </button>
      </div>
    );
  }

  // Loading (default)
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="w-28 h-28 bg-orange-500 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-orange-200">
          <span className="text-5xl">🍽️</span>
        </div>

        {/* Brand */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Food Delivery
          </h1>
          <p className="text-gray-400 text-sm mt-2">{t.auth.loading}</p>
        </div>

        {/* Animated dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 bg-orange-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
