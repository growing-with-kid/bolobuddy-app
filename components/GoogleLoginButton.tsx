'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export function GoogleLoginButton() {
  const supabase = createClient();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: { access_type: 'offline', prompt: 'consent' },
      },
    });
    if (err) {
      setError(err.message);
      setLoading(false);
    }
    // If no error, page will redirect; loading stays true
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-white border-2 border-gray-200 rounded-[100px] text-[#2D2D2D] font-semibold text-base disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <img src="/google-icon.svg" alt="Google" width={20} height={20} />
        {loading ? 'Redirecting…' : 'Google se login karo'}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
