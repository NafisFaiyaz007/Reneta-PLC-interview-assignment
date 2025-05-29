import React from 'react';

/**
 * @component FilterSelect
 * @description A reusable select dropdown component for filtering data.
 * @param {object} props - The component's props.
 * @param {string} props.label - The label for the select input.
 * @param {string[]} props.options - An array of option values for the select dropdown.
 * @param {function} props.onChange - The callback function to execute when the select value changes.
 * @returns {JSX.Element}
 */
const FilterSelect = ({ label, options, onChange }) => (
  <div className="flex flex-col w-full sm:w-1/2 md:w-1/4 px-2 mb-4 md:mb-0">
    <label className="text-white font-medium mb-1 text-sm">{label}</label>
    <select
      onChange={(e) => onChange(e.target.value)}
      className="p-2 rounded bg-[#1e293b] text-white border border-gray-600 focus:ring-2 focus:ring-[#e94560] outline-none text-sm appearance-none"
      style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em' }}
    >
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-[#1e293b] text-white">
          {/* Special handling for gender options to display full names */}
          {opt === "M" ? "Male" : opt === "F" ? "Female" : opt}
        </option>
      ))}
    </select>
  </div>
);

export default FilterSelect;
