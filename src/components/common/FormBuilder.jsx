import React from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

export default function FormBuilder({
  fields,
  values,
  onChange,
  onSubmit,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  onCancel,
  className = "",
  submitIcon,
  cancelIcon,
  hideActions = false,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ name, value });
  };

  return (
    <form onSubmit={onSubmit} className={`space-y-6 ${className}`}>
      {fields.map((field) => (
        <div key={field.name}>
          {field.type === "select" ? (
            <Select
              label={field.label}
              name={field.name}
              value={values[field.name]}
              onChange={handleChange}
              options={field.options}
              required={field.required}
              placeholder={field.placeholder}
            />
          ) : field.type === "radio" ? (
            <div>
              <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                {field.label}
              </label>
              <div className="flex items-center space-x-6">
                {field.options.map((option) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      id={option.value}
                      name={field.name}
                      value={option.value}
                      checked={values[field.name] === option.value}
                      onChange={handleChange}
                      className="w-4 h-4 text-[var(--purple-600)]"
                    />
                    <label
                      htmlFor={option.value}
                      className="ml-2 text-[var(--gray-700)]"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Input
              type={field.type || "text"}
              label={field.label}
              name={field.name}
              value={values[field.name]}
              onChange={handleChange}
              required={field.required}
              placeholder={field.placeholder}
              className={field.className}
            />
          )}
        </div>
      ))}

      {!hideActions && (
        <div className="flex justify-end space-x-3">
          {onCancel && (
            <Button variant="secondary" type="button" onClick={onCancel} icon={cancelIcon}>
              {cancelLabel}
            </Button>
          )}
          <Button variant="primary" type="submit" icon={submitIcon}>
            {submitLabel}
          </Button>
        </div>
      )}
    </form>
  );
} 