import type { UseFormRegisterReturn } from 'react-hook-form';

interface TextareaFieldProps {
  label: string;
  placeholder: string;
  error?: string;
  register: UseFormRegisterReturn;
  rows?: number;
  labelColor?: string;
  inputBg?: string;
}

const TextareaField = ({
  label,
  placeholder,
  error,
  register,
  rows = 5,
  labelColor = 'text-theme-text-primary',
  inputBg = 'bg-transparent',
}: TextareaFieldProps) => {
  return (
    <div>
      <label className={`block mb-1 font-medium ${labelColor}`}>{label}</label>
      <textarea
        placeholder={placeholder}
        rows={rows}
        className={`w-full border border-theme-border-primary rounded-lg px-4 py-2.5 placeholder-theme-placeholder-primary resize-vertical focus:outline-none focus:ring-2 focus:ring-theme-button-primary focus:border-transparent transition-all text-sm ${inputBg}`}
        {...register}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default TextareaField;
