import * as React from "react";
import { cn } from "@/lib/utils";
import { Search, Calendar, X } from "lucide-react";
import "@/app/form-controls.css";

// Input Component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  success?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, success, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "control-input",
          error && "control-input-error",
          success && "control-input-success",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

// Select Component
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "control-select",
          error && "control-select-error",
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = "Select";

// Textarea Component
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "control-textarea",
          error && "control-textarea-error",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "success";
  size?: "sm" | "default" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
  icon?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = "primary", 
    size = "default", 
    loading, 
    fullWidth,
    icon,
    children, 
    disabled,
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "control-action",
          `control-action-${variant}`,
          size === "sm" && "control-action-sm",
          size === "lg" && "control-action-lg",
          loading && "control-action-loading",
          fullWidth && "control-action-full",
          icon && "control-action-icon",
          icon && size === "sm" && "control-action-icon-sm",
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

// Checkbox Component
interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="checkbox"
        className={cn("control-checkbox", className)}
        {...props}
      />
    );
  }
);
Checkbox.displayName = "Checkbox";

// Radio Component
interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="radio"
        className={cn("control-radio", className)}
        {...props}
      />
    );
  }
);
Radio.displayName = "Radio";

// Switch Component
interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, onChange, disabled, className }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        className={cn(
          "control-switch",
          checked && "control-switch-checked",
          className
        )}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
      >
        <span className="control-switch-thumb" />
      </button>
    );
  }
);
Switch.displayName = "Switch";

// Form Group Component
interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const FormGroup: React.FC<FormGroupProps> = ({ children, className }) => {
  return <div className={cn("control-group", className)}>{children}</div>;
};

// Label Component
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "control-label",
          required && "control-label-required",
          className
        )}
        {...props}
      >
        {children}
      </label>
    );
  }
);
Label.displayName = "Label";

// Help Text Component
interface HelpTextProps {
  children: React.ReactNode;
  className?: string;
}

export const HelpText: React.FC<HelpTextProps> = ({ children, className }) => {
  return <span className={cn("control-help", className)}>{children}</span>;
};

// Error Text Component
interface ErrorTextProps {
  children: React.ReactNode;
  className?: string;
}

export const ErrorText: React.FC<ErrorTextProps> = ({ children, className }) => {
  return <span className={cn("control-error", className)}>{children}</span>;
};

// Search Input Component
interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onClear, ...props }, ref) => {
    return (
      <div className="control-search">
        <Search className="control-search-icon" />
        <input
          ref={ref}
          type="text"
          className={cn("control-input", className)}
          value={value}
          {...props}
        />
        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        )}
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";

// Date Input Component
interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="control-date">
        <input
          ref={ref}
          type="date"
          className={cn("control-input", className)}
          {...props}
        />
        <Calendar className="control-date-icon" />
      </div>
    );
  }
);
DateInput.displayName = "DateInput";

// Input Group Component
interface InputGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const InputGroup: React.FC<InputGroupProps> = ({ children, className }) => {
  return <div className={cn("control-input-group", className)}>{children}</div>;
};

// Input Addon Component
interface InputAddonProps {
  children: React.ReactNode;
  className?: string;
}

export const InputAddon: React.FC<InputAddonProps> = ({ children, className }) => {
  return <span className={cn("control-input-addon", className)}>{children}</span>;
};

// Filter Bar Component
interface FilterBarProps {
  children: React.ReactNode;
  className?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({ children, className }) => {
  return <div className={cn("layout-filter-bar", className)}>{children}</div>;
};

// Filter Group Component
interface FilterGroupProps {
  label?: string;
  children: React.ReactNode;
  className?: string;
}

export const FilterGroup: React.FC<FilterGroupProps> = ({ label, children, className }) => {
  return (
    <div className={cn("layout-filter-group", className)}>
      {label && <span className="layout-filter-label">{label}</span>}
      {children}
    </div>
  );
};

// Form Grid Component
interface FormGridProps {
  columns?: 2 | 3 | 4;
  children: React.ReactNode;
  className?: string;
}

export const FormGrid: React.FC<FormGridProps> = ({ columns = 2, children, className }) => {
  return (
    <div className={cn("control-grid", `control-grid-${columns}`, className)}>
      {children}
    </div>
  );
};