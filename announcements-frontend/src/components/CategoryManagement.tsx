import { useState, useEffect } from "react";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../services/api";
import type { Category } from "../types";

interface CategoryManagementProps {
  onBack: () => void;
}

export default function CategoryManagement({ onBack }: CategoryManagementProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

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

  const handleCreate = () => {
    setIsCreating(true);
    setEditingCategory(null);
    setNewCategoryName("");
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    setIsCreating(false);
  };

  const handleSave = async () => {
    if (!newCategoryName.trim()) {
      setError("Category name is required");
      return;
    }

    try {
      setError(null);
      
      if (isCreating) {
        await createCategory({ name: newCategoryName.trim() });
      } else if (editingCategory) {
        await updateCategory(editingCategory.id, { name: newCategoryName.trim() });
      }
      
      await loadCategories();
      setEditingCategory(null);
      setNewCategoryName("");
      setIsCreating(false);
    } catch (err) {
      setError("Failed to save category");
      console.error("Error saving category:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }

    try {
      await deleteCategory(id);
      await loadCategories();
    } catch (err) {
      setError("Failed to delete category");
      console.error("Error deleting category:", err);
    }
  };

  const handleCancel = () => {
    setEditingCategory(null);
    setNewCategoryName("");
    setIsCreating(false);
    setError(null);
  };

  if (loading) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-100 d-flex flex-column">
      <div className="container-fluid py-4 flex-grow-1 overflow-auto">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                <div className="d-flex justify-content-between align-items-center">
                  <h2 className="h4 mb-0">
                    <i className="bi bi-tags me-2"></i>
                    Category Management
                  </h2>
                  <button
                    onClick={onBack}
                    className="btn btn-outline-light"
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Announcements
                  </button>
                </div>
              </div>

              <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}

              {/* Create/Edit Form */}
              {(isCreating || editingCategory) && (
                <div className="card mb-4">
                  <div className="card-header bg-light">
                    <h5 className="mb-0">
                      {isCreating ? "Create New Category" : "Edit Category"}
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label htmlFor="categoryName" className="form-label">
                        Category Name *
                      </label>
                      <input
                        type="text"
                        id="categoryName"
                        className="form-control"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="Enter category name"
                        autoFocus
                      />
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        onClick={handleSave}
                        className="btn btn-primary"
                      >
                        <i className="bi bi-check me-1"></i>
                        {isCreating ? "Create" : "Update"}
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn btn-secondary"
                      >
                        <i className="bi bi-x me-1"></i>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Categories List */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Categories ({categories.length})</h5>
                {!isCreating && !editingCategory && (
                  <button
                    onClick={handleCreate}
                    className="btn btn-primary"
                  >
                    <i className="bi bi-plus me-1"></i>
                    Add New Category
                  </button>
                )}
              </div>

              {categories.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-tags display-1 text-muted mb-3"></i>
                  <h5 className="text-muted">No categories yet</h5>
                  <p className="text-muted">Create your first category to get started</p>
                  <button
                    onClick={handleCreate}
                    className="btn btn-primary"
                  >
                    <i className="bi bi-plus me-1"></i>
                    Create First Category
                  </button>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Name</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category) => (
                        <tr key={category.id}>
                          <td>
                            <span className="fw-medium">{category.name}</span>
                          </td>
                          <td>
                            <div className="d-flex gap-1">
                              <button
                                onClick={() => handleEdit(category)}
                                className="btn btn-sm btn-outline-primary"
                                title="Edit category"
                                disabled={isCreating || editingCategory !== null}
                              >
                                <i className="bi bi-pencil"></i>
                              </button>
                              <button
                                onClick={() => handleDelete(category.id)}
                                className="btn btn-sm btn-outline-danger"
                                title="Delete category"
                                disabled={isCreating || editingCategory !== null}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
