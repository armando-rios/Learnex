import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectDropdownProps {
  value: string | null;
  onChange: (value: string) => void;
  error?: string;
}

const SelectDropdown = ({ value, onChange, error }: SelectDropdownProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option);
    setDropdownOpen(false);
  };

  const options = [
    {
      value: 'ROLE_USER',
      icon: '🎓',
      title: 'Estudiante',
      description: 'Aprende y desarrolla nuevas habilidades',
    },
    {
      value: 'ROLE_MENTOR',
      icon: '👨‍🏫',
      title: 'Mentor',
      description: 'Comparte tu conocimiento y experiencia',
    },
  ];

  const selectedOption = options.find((opt) => opt.value === value);

  // Si no hay valor seleccionado, usar Estudiante por defecto
  const displayOption = selectedOption || options[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="relative w-full bg-white border border-theme-border-primary rounded-lg px-4 py-2.5 text-left focus:outline-none focus:ring-2 focus:ring-theme-button-primary focus:border-transparent transition-all text-sm text-gray-900 flex items-center justify-between"
      >
        {selectedOption ? (
          <div className="flex items-center gap-2">
            <span className="text-base">{displayOption.icon}</span>
            <span className="font-medium">{displayOption.title}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-base">{displayOption.icon}</span>
            <span className="font-medium text-gray-900">
              {displayOption.title}
            </span>
          </div>
        )}
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            dropdownOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {dropdownOpen && (
        <>
          {/* Overlay para cerrar el dropdown */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setDropdownOpen(false)}
          />

          {/* Dropdown menu */}
          <div className="absolute top-full mt-1 w-full bg-white border border-theme-border-primary rounded-lg shadow-lg z-20 overflow-hidden">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className="w-full p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 focus:outline-none focus:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{option.icon}</span>
                  <div>
                    <div className="font-medium text-gray-900">
                      {option.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {option.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {error && (
        <span className="text-xs text-red-500 mt-1 block">{error}</span>
      )}
    </div>
  );
};

export default SelectDropdown;
