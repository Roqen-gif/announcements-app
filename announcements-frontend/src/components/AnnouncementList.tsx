import { useState, useMemo } from "react";
import CategorySelect from "./CategorySelect";
import { updateAnnouncementCategories } from "../services/api";
import type { Announcement } from "../types";

interface AnnouncementListProps {
  announcements: Announcement[];
  onCreate: () => void;
  onEdit: (announcement: Announcement) => void;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function AnnouncementList({
  announcements,
  onCreate,
  onEdit,
  onSelect,
  onDelete,
}: AnnouncementListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingCategories, setEditingCategories] = useState<{ id: number; name: string }[]>([]);
  
  // Filter and sort states
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<"title" | "published" | "updated" | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${month}/${day}/${year} ${hours}:${minutes}`;
  };

  // Filtered and sorted announcements
  const filteredAndSortedAnnouncements = useMemo(() => {
    let filtered = announcements.filter(announcement => {
      // Search term filter (searches in title, published date, and updated date)
      const searchMatch = searchTerm === "" || 
        announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        formatDateTime(announcement.publicationDate).toLowerCase().includes(searchTerm.toLowerCase()) ||
        formatDateTime(announcement.lastUpdate).toLowerCase().includes(searchTerm.toLowerCase());
      
      return searchMatch;
    });

    // Sorting
    if (sortField) {
      filtered.sort((a, b) => {
        let aValue: string | number;
        let bValue: string | number;

        switch (sortField) {
          case "title":
            aValue = a.title.toLowerCase();
            bValue = b.title.toLowerCase();
            break;
          case "published":
            aValue = new Date(a.publicationDate).getTime();
            bValue = new Date(b.publicationDate).getTime();
            break;
          case "updated":
            aValue = new Date(a.lastUpdate).getTime();
            bValue = new Date(b.lastUpdate).getTime();
            break;
          default:
            return 0;
        }

        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [announcements, searchTerm, sortField, sortDirection]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSortField(null);
    setSortDirection("asc");
  };

  // Handle sorting
  const handleSort = (field: "title" | "published" | "updated") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Get sort icon for column header
  const getSortIcon = (field: "title" | "published" | "updated") => {
    if (sortField !== field) return <i className="bi bi-arrow-down-up text-muted"></i>;
    return sortDirection === "asc" ? 
      <i className="bi bi-arrow-up text-primary"></i> : 
      <i className="bi bi-arrow-down text-primary"></i>;
  };

  const handleCategoryEdit = (id: number) => {
    const announcement = announcements.find(a => a.id === id);
    if (announcement) {
      setEditingId(id.toString());
      setEditingCategories(announcement.categories || []);
    }
  };

  const handleCategorySave = async (id: number) => {
    try {
      await updateAnnouncementCategories(id, editingCategories.map(cat => cat.id));
      setEditingId(null);
      setEditingCategories([]);
      // Refresh the list or update the specific announcement
      window.location.reload(); // Simple refresh for now
    } catch (error) {
      console.error('Error updating categories:', error);
      alert('Failed to update categories');
    }
  };

  const handleCategoryCancel = () => {
    setEditingId(null);
    setEditingCategories([]);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      onDelete(id);
    }
  };

  if (announcements.length === 0) {
    return (
      <div className="h-100 d-flex flex-column">
        {/* Header with Add Button */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="h4 mb-1">Announcements</h2>
            <p className="text-muted mb-0">No announcements yet</p>
          </div>
          <button
            onClick={onCreate}
            className="btn btn-primary"
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add New Announcement
          </button>
        </div>
        
        {/* Search Row */}
        <div className="row mb-3">
          <div className="col-md-10">
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by title, published date, or updated date..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled
              />
            </div>
          </div>
          <div className="col-md-2">
            <button
              onClick={clearFilters}
              className="btn btn-outline-secondary w-100"
              disabled
            >
              <i className="bi bi-x-circle me-2"></i>
              Clear All
            </button>
          </div>
        </div>

        <div className="flex-grow-1 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <div className="text-muted display-1 mb-3">📢</div>
            <h3 className="text-muted mb-3">No announcements yet</h3>
            <p className="text-muted mb-4">Create your first announcement to get started</p>
          </div>
        </div>
      </div>
    );
  }

  if (filteredAndSortedAnnouncements.length === 0 && searchTerm) {
    return (
      <div className="h-100 d-flex flex-column">
        {/* Header with Add Button */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="h4 mb-1">Announcements</h2>
            <p className="text-muted mb-0">No announcements match your search</p>
          </div>
          <div className="d-flex gap-2">
            <button
              onClick={clearFilters}
              className="btn btn-outline-secondary"
            >
              <i className="bi bi-x-circle me-2"></i>
              Clear Search
            </button>
            <button
              onClick={onCreate}
              className="btn btn-primary"
            >
              <i className="bi bi-plus-circle me-2"></i>
              Add New Announcement
            </button>
          </div>
        </div>
        
        {/* Search Row */}
        <div className="row mb-3">
          <div className="col-md-10">
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by title, published date, or updated date..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setSearchTerm("")}
                >
                  <i className="bi bi-x"></i>
                </button>
              )}
            </div>
          </div>
          <div className="col-md-2">
            <button
              onClick={clearFilters}
              className="btn btn-outline-secondary w-100"
              disabled={!searchTerm}
            >
              <i className="bi bi-x-circle me-2"></i>
              Clear All
            </button>
          </div>
        </div>

        <div className="flex-grow-1 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <div className="text-muted display-1 mb-3">🔍</div>
            <h4 className="text-muted mb-3">No results found</h4>
            <p className="text-muted">Try adjusting your search criteria</p>
          </div>
        </div>
      </div>
    );
}

  return (
    <div className="h-100 d-flex flex-column">
      {/* Header with Add Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
    <div>
          <h2 className="h4 mb-1">Announcements</h2>
          <p className="text-muted mb-0">
            {filteredAndSortedAnnouncements.length} of {announcements.length} announcement{announcements.length !== 1 ? 's' : ''}
            {searchTerm && ' (filtered)'}
          </p>
        </div>
        <div className="d-flex gap-2">
          {searchTerm && (
            <button
              onClick={clearFilters}
              className="btn btn-outline-secondary"
            >
              <i className="bi bi-x-circle me-2"></i>
              Clear Filters
            </button>
          )}
          <button
            onClick={onCreate}
            className="btn btn-primary"
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add New Announcement
          </button>
        </div>
      </div>

      {/* Search Row */}
      <div className="row mb-3">
        <div className="col-md-10">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by title, published date, or updated date..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setSearchTerm("")}
              >
                <i className="bi bi-x"></i>
              </button>
            )}
          </div>
        </div>
        <div className="col-md-2">
          <button
            onClick={clearFilters}
            className="btn btn-outline-secondary w-100"
            disabled={!searchTerm}
          >
            <i className="bi bi-x-circle me-2"></i>
            Clear All
          </button>
        </div>
      </div>

      {/* Table Container with Scroll */}
      <div className="flex-grow-1 overflow-auto">
        <div className="table-responsive" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          <table className="table table-hover mb-0">
            <thead className="table-light" style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: '#f8f9fa' }}>
              <tr>
                <th 
                  className="border-0 cursor-pointer user-select-none" 
                  onClick={() => handleSort("title")}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <span>Title</span>
                    {getSortIcon("title")}
                  </div>
                </th>
                <th 
                  className="border-0 cursor-pointer user-select-none" 
                  onClick={() => handleSort("published")}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <span>Published</span>
                    {getSortIcon("published")}
                  </div>
                </th>
                <th 
                  className="border-0 cursor-pointer user-select-none" 
                  onClick={() => handleSort("updated")}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <span>Updated</span>
                    {getSortIcon("updated")}
                  </div>
                </th>
                <th className="border-0">Categories</th>
                <th className="border-0">Actions</th>
          </tr>
        </thead>
        <tbody>
              {filteredAndSortedAnnouncements.map((announcement) => (
                <tr key={announcement.id}>
                  <td>
                    <div className="fw-semibold text-dark">
                      {announcement.title}
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-light text-dark font-monospace">
                      {formatDateTime(announcement.publicationDate)}
                    </span>
                  </td>
                  <td>
                    <span className="badge bg-light text-dark font-monospace">
                      {formatDateTime(announcement.lastUpdate)}
                    </span>
                  </td>
                  <td>
                    {editingId === announcement.id.toString() ? (
                      <div className="d-flex align-items-start gap-2" style={{ minHeight: '60px', position: 'relative', zIndex: 10 }}>
                        <div style={{ minWidth: '250px', position: 'relative', zIndex: 11 }}>
                          <CategorySelect
                            value={editingCategories}
                            onChange={setEditingCategories}
                          />
                        </div>
                        <div className="d-flex flex-column gap-1">
                          <button
                            onClick={() => handleCategorySave(announcement.id)}
                            className="btn btn-sm btn-success"
                            title="Save categories"
                          >
                            <i className="bi bi-check"></i>
                          </button>
                          <button
                            onClick={handleCategoryCancel}
                            className="btn btn-sm btn-secondary"
                            title="Cancel"
                          >
                            <i className="bi bi-x"></i>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="d-flex align-items-center gap-2">
                        <div className="d-flex flex-wrap gap-1">
                          {announcement.categories && announcement.categories.length > 0 ? (
                            announcement.categories.map((category: any) => (
                              <span
                                key={category.id}
                                className="badge bg-primary"
                              >
                                {category.name}
                              </span>
                            ))
                          ) : (
                            <span className="text-muted small">No categories</span>
                          )}
                        </div>
                        <button
                          onClick={() => handleCategoryEdit(announcement.id)}
                          className="btn btn-sm btn-outline-secondary"
                          title="Edit categories"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                      </div>
                    )}
              </td>
              <td>
                    <div className="d-flex gap-1">
                      <button
                        onClick={() => onSelect(announcement.id)}
                        className="btn btn-sm btn-outline-primary"
                        title="View details"
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                      <button
                        onClick={() => onEdit(announcement)}
                        className="btn btn-sm btn-outline-warning"
                        title="Edit announcement"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(announcement.id)}
                        className="btn btn-sm btn-outline-danger"
                        title="Delete announcement"
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
      </div>
    </div>
  );
}