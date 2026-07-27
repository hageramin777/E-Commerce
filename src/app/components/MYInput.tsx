"use client"

import { UseFormRegister, FieldValues, Path } from "react-hook-form"

interface MYInputProps<T extends FieldValues> {
  label: string
  type?: string
  name: Path<T>
  register: UseFormRegister<T>
  error?: string
  placeholder?: string
  required?: boolean
}

export default function MYInput<T extends FieldValues>({
  label,
  type = "text",
  name,
  register,
  error,
  placeholder,
  required,
}: MYInputProps<T>) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium mb-1">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        {...register(name)}
        className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 placeholder:text-gray-400 ${
          error ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-emerald-200"
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}