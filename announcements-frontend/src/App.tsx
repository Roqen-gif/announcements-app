import { useState, useEffect } from "react";
import LeftSidebar from "./components/LeftSidebar";
import AnnouncementList from "./components/AnnouncementList";
import AnnouncementForm from "./components/AnnouncementForm";
import CategoryManagement from "./components/CategoryManagement";
import { getAnnouncements, getAnnouncement, createAnnouncement, updateAnnouncement, deleteAnnouncement } from "./services/api";
import type { Announcement } from "./types";

function App() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<"list" | "form" | "details" | "categories">("list");
  const [current, setCurrent] = useState<Announcement | null>(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${month}/${day}/${year} ${hours}:${minutes}`;
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAnnouncements() as Announcement[];
      setAnnouncements(data);
    } catch (err) {
      setError("Failed to load announcements");
      console.error("Error loading announcements:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setCurrent(null);
    setView("form");
  };

  const handleEdit = (announcement: Announcement) => {
    setCurrent(announcement);
    setView("form");
  };

  const handleSelect = async (id: number) => {
    try {
      const announcement = await getAnnouncement(id) as Announcement;
      setSelectedAnnouncement(announcement);
      setView("details");
    } catch (err) {
      console.error("Error loading announcement:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      try {
        await deleteAnnouncement(id);
        await loadAnnouncements();
      } catch (err) {
        setError("Failed to delete announcement");
        console.error("Error deleting announcement:", err);
      }
    }
  };

  const handleSave = async (announcement: { title: string; content: string; publishedDate: string; categories: number[] }) => {
    try {
      if (current) {
        await updateAnnouncement(current.id, announcement);
      } else {
        await createAnnouncement(announcement);
      }
      await loadAnnouncements();
      setView("list");
      setCurrent(null);
    } catch (err) {
      setError("Failed to save announcement");
      console.error("Error saving announcement:", err);
    }
  };

  const handleBackToList = () => {
    setView("list");
    setCurrent(null);
    setSelectedAnnouncement(null);
  };

  const handleCategories = () => {
    setView("categories");
  };

  const handleAllAnnouncements = () => {
    setView("list");
  };

  if (loading) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Loading announcements...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <div className="text-danger display-1 mb-3">⚠️</div>
          <h2 className="h2 text-dark mb-2">Error</h2>
          <p className="text-muted mb-4">{error}</p>
          <button
            onClick={loadAnnouncements}
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="vh-100 d-flex">
      {/* Left Sidebar */}
      <LeftSidebar 
        announcementsCount={announcements.length}
        onCreate={handleCreate}
        onCategories={handleCategories}
        onAllAnnouncements={handleAllAnnouncements}
      />

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Header */}
        <header className="bg-white shadow-sm border-bottom">
          <div className="container-fluid">
            <div className="d-flex justify-content-end align-items-center py-3">
              {view !== "list" && (
                <button
                  onClick={handleBackToList}
                  className="btn btn-outline-secondary"
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Back to List
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-grow-1 overflow-hidden">
          <div className="container-fluid h-100">
            {view === "list" && (
              <AnnouncementList
                announcements={announcements}
                onCreate={handleCreate}
                onEdit={handleEdit}
                onSelect={handleSelect}
                onDelete={handleDelete}
              />
            )}
            {view === "form" && (
              <div className="row justify-content-center h-100">
                <div className="col-12 col-lg-8 d-flex align-items-center">
                  <AnnouncementForm
                    current={current || undefined}
                    onSave={handleSave}
                    onDone={handleBackToList}
                  />
                </div>
              </div>
            )}
            {view === "details" && selectedAnnouncement ? (
              <div className="row justify-content-center h-100">
                <div className="col-12 col-lg-10 d-flex align-items-center">
                  <div className="card shadow w-100">
                    <div className="card-header bg-primary text-white">
                      <h2 className="h3 mb-2">{selectedAnnouncement.title}</h2>
                      <div className="d-flex flex-wrap gap-3 text-light">
                        <small>
                          <i className="bi bi-calendar-event me-1"></i>
                          Published: {formatDateTime(selectedAnnouncement.publicationDate)}
                        </small>
                        {selectedAnnouncement.lastUpdate !== selectedAnnouncement.publicationDate && (
                          <small>
                            <i className="bi bi-arrow-clockwise me-1"></i>
                            Updated: {formatDateTime(selectedAnnouncement.lastUpdate)}
                          </small>
                        )}
                      </div>
                    </div>
                    
                    <div className="card-body">
                      {selectedAnnouncement.categories && selectedAnnouncement.categories.length > 0 && (
                        <div className="mb-4">
                          <h5 className="text-muted mb-2">Categories</h5>
                          <div className="d-flex flex-wrap gap-2">
                            {selectedAnnouncement.categories.map((category: any) => (
                              <span
                                key={category.id}
                                className="badge bg-primary"
                              >
                                {category.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <h5 className="text-muted mb-3">Content</h5>
                        <div className="bg-light p-4 rounded border">
                          <pre className="mb-0 text-dark" style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                            {selectedAnnouncement.content}
                          </pre>
                        </div>
                      </div>
                    </div>

                    <div className="card-footer bg-light">
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          onClick={() => handleEdit(selectedAnnouncement)}
                          className="btn btn-primary"
                        >
                          <i className="bi bi-pencil me-1"></i>
                          Edit
                        </button>
                        <button
                          onClick={handleBackToList}
                          className="btn btn-secondary"
                        >
                          <i className="bi bi-x me-1"></i>
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {view === "categories" && (
              <CategoryManagement onBack={handleBackToList} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;