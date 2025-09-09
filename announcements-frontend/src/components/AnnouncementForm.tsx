import { useState, useEffect } from "react";
import CategorySelect from "./CategorySelect";
import type { Announcement, Category } from "../types";

interface AnnouncementFormProps {
  current?: Announcement;
  onSave: (announcement: { title: string; content: string; publishedDate: string; categories: number[] }) => void;
  onDone: () => void;
}

export default function AnnouncementForm({ current, onSave, onDone }: AnnouncementFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (current) {
      setTitle(current.title);
      setContent(current.content);
      setPublishedDate(current.publicationDate);
      setCategories(current.categories || []);
    } else {
      // For new announcements, set current date and time
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setPublishedDate(`${year}-${month}-${day}T${hours}:${minutes}`);
    }
  }, [current]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim() || !publishedDate) {
      setError("Please fill in all required fields");
      return;
    }

    if (categories.length === 0) {
      setError("Please select at least one category");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await onSave({
        title: title.trim(),
        content: content.trim(),
        publishedDate: publishedDate,
        categories: categories.map(cat => cat.id),
      });
    } catch (err) {
      setError("Failed to save announcement");
      console.error("Error saving announcement:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow w-100">
      <div className="card-header bg-primary text-white">
        <h2 className="h4 mb-0">
          {current ? "Edit Announcement" : "Create New Announcement"}
        </h2>
      </div>
      
      <div className="card-body">
        {error && (
          <div className="alert alert-danger d-flex align-items-center" role="alert">
            <i className="bi bi-exclamation-triangle me-2"></i>
            <div>{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title *
            </label>
            <input
              type="text"
              id="title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
              placeholder="Enter announcement title"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              Content *
            </label>
            <textarea
              id="content"
              className="form-control"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              disabled={loading}
              placeholder="Enter announcement content"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="publishedDate" className="form-label">
              Published Date *
            </label>
            <input
              type="datetime-local"
              id="publishedDate"
              className="form-control"
              value={publishedDate}
              onChange={(e) => setPublishedDate(e.target.value)}
              disabled={loading}
            />
            <div className="form-text">
              Set the publication date and time for this announcement
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label">
              Categories *
            </label>
            <CategorySelect 
              value={categories} 
              onChange={setCategories}
            />
            <div className="form-text">
              Select at least one category for this announcement
            </div>
          </div>

          <div className="d-flex gap-2 justify-content-end">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Saving...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle me-2"></i>
                  {current ? "Update Announcement" : "Create Announcement"}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onDone}
              disabled={loading}
              className="btn btn-secondary"
            >
              <i className="bi bi-x-circle me-2"></i>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}