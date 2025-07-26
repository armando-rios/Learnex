import React from 'react';

interface ButtonProps {
  title: string;
  styles?: string;
  onClick?: () => void;
  icon?: React.ReactNode; // Icono opcional para renderizar dentro del botón
}

export const ButtonPrimary = ({
  title,
  styles,
  onClick,
  icon,
}: ButtonProps) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`w-full bg-theme-button-primary py-3 rounded-lg font-semibold text-lg hover:bg-theme-button-primary/60 transition flex items-center justify-center gap-2 ${styles || ''}`}
    >
      {icon && (
        <span className="w-[0.9375rem] h-[0.9375rem] flex items-center">
          {icon}
        </span>
      )}
      {title}
    </button>
  );
};

export const ButtonSecondary = ({
  title,
  styles,
  onClick,
  icon,
}: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full bg-theme-button-secondary py-3 rounded-lg font-semibold text-lg hover:bg-theme-button-secondary/60 transition flex items-center justify-center gap-2 ${styles || ''}`}
    >
      {icon && (
        <span className="w-[0.9375rem] h-[0.9375rem] flex items-center">
          {icon}
        </span>
      )}
      {title}
    </button>
  );
};

export const ButtonLogout = ({ title, styles, onClick, icon }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center gap-[0.25rem] bg-[#F3F4F6] border-[0.025rem] border-[#F3F4F6] text-[#6B7280] hover:bg-red-50 text-[0.625rem] rounded p-[0.2rem] w-[4rem] mx-auto ${styles || ''}`}
    >
      {icon && (
        <span className="w-[0.9375rem] h-[0.9375rem] flex items-center">
          {icon}
        </span>
      )}
      {title}
    </button>
  );
};

export const ButtonProfileOption = ({
  title,
  styles,
  onClick,
  icon,
}: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-[0.375rem] text-left text-gray-700 hover:bg-gray-100 text-[0.875rem] rounded p-[0.50rem] cursor-pointer w-full ${styles || ''}`}
    >
      {icon && (
        <span className="w-[0.9375rem] h-[0.9375rem] flex items-center">
          {icon}
        </span>
      )}
      {title}
    </button>
  );
};
