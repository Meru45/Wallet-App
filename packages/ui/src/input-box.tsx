"use client";

interface InputBoxProps {
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  type: string;
  min?: string;
}

export const InputBox = ({
  label,
  onChange,
  placeholder,
  type,
  min,
}: InputBoxProps) => {
  return (
    <div className="pt-2">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        min={min}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />
    </div>
  );
};
