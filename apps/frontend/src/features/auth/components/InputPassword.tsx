import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface InputPasswordProps {
  error?: string; // Optional error message to display
  register: UseFormRegisterReturn;
  labelColor?: string;
  inputBg?: string;
}

const InputPassword = ({
  error,
  register,
  labelColor = 'text-theme-text-primary',
  inputBg = 'bg-transparent',
}: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPassword ? 'text' : 'password';

  return (
    <div>
      <label className={`block mb-1 font-medium ${labelColor}`}>
        Contraseña
      </label>
      <div className="flex items-center justify-end relative">
        <input
          type={inputType}
          placeholder="Enter your password"
          className={`w-full border border-theme-border-primary rounded-lg px-4 py-2.5 placeholder-theme-placeholder-primary focus:outline-none focus:ring-2 focus:ring-theme-button-primary focus:border-transparent transition-all text-sm ${inputBg} ${inputBg === 'bg-white' ? 'text-gray-900 placeholder-gray-500' : ''}`}
          {...register}
        />
        <button
          type="button"
          className={`absolute right-0 mr-2 transition-colors ${inputBg === 'bg-white' ? 'text-gray-500 hover:text-gray-700' : 'text-theme-placeholder-primary'}`}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <Eye className="w-5 h-5" />
          ) : (
            <EyeClosed className="w-5 h-5" />
          )}
        </button>
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default InputPassword;
