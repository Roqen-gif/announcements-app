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

  // Filter out already selected categories
  const selectedIds = value.map(cat => cat.id);
  const availableCategories = categories.filter(category => !selectedIds.includes(category.id));
  
  const options = availableCategories.map(category => ({
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
    <div>
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        placeholder={availableCategories.length === 0 ? "All categories selected" : "Select categories..."}
        className="react-select-container"
        classNamePrefix="react-select"
        menuPlacement="auto"
        maxMenuHeight={200}
        isDisabled={availableCategories.length === 0}
        styles={{
          control: (provided) => ({
            ...provided,
            minHeight: '38px',
            border: '1px solid #ced4da',
            borderRadius: '0.375rem',
          }),
          menu: (provided) => ({
            ...provided,
            zIndex: 9999,
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
      {availableCategories.length === 0 && categories.length > 0 && (
        <div className="form-text text-muted">
          <i className="bi bi-info-circle me-1"></i>
          All available categories have been selected
        </div>
      )}
    </div>
  );
}