import { useState, useEffect } from "react";
import Select from "react-select";
import { getCategories } from "../services/api";
import type { Category } from "../types";

interface CategorySelectProps {
  value: Category[];
  onChange: (categories: Category[]) => void;
}

export default function CategorySelect({ value, onChange }: CategorySelectProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCategories() as Category[];
      setCategories(data);
    } catch (err) {
      setError("Failed to load categories");
      console.error("Error loading categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const options = categories.map(category => ({
    value: category,
    label: category.name
  }));

  const selectedOptions = value.map(category => ({
    value: category,
    label: category.name
  }));

  const handleChange = (selectedOptions: any) => {
    const selectedCategories = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
    onChange(selectedCategories);
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center text-muted">
        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Loading categories...
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-warning" role="alert">
        <i className="bi bi-exclamation-triangle me-2"></i>
        {error}
      </div>
    );
  }

  return (
    <Select
      isMulti
      options={options}
      value={selectedOptions}
      onChange={handleChange}
      placeholder="Select categories..."
      className="react-select-container"
      classNamePrefix="react-select"
      styles={{
        control: (provided) => ({
          ...provided,
          minHeight: '38px',
          border: '1px solid #ced4da',
          borderRadius: '0.375rem',
        }),
        multiValue: (provided) => ({
          ...provided,
          backgroundColor: '#e7f3ff',
          borderRadius: '0.25rem',
        }),
        multiValueLabel: (provided) => ({
          ...provided,
          color: '#0d6efd',
          fontSize: '0.875rem',
        }),
        multiValueRemove: (provided) => ({
          ...provided,
          color: '#0d6efd',
          '&:hover': {
            backgroundColor: '#0d6efd',
            color: 'white',
          },
        }),
      }}
    />
  );
}