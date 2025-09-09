import { useState } from "react";

interface LeftSidebarProps {
  announcementsCount: number;
  onCreate: () => void;
  onCategories: () => void;
  onAllAnnouncements: () => void;
}

export default function LeftSidebar({ announcementsCount, onCreate, onCategories, onAllAnnouncements }: LeftSidebarProps) {
  const [cityName, setCityName] = useState("Test City");

  return (
    <div className="left-sidebar bg-light border-end" style={{ width: '280px', minHeight: '100vh' }}>
      {/* City Header */}
      <div className="p-3 border-bottom">
        <div className="d-flex align-items-center">
          <div 
            className="city-icon me-3" 
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #28a745 0%, #20c997 50%, #ffc107 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            <div 
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: '#dc3545',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <div 
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: '#ffc107',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div 
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: '#fff'
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <h5 className="mb-0 fw-bold text-dark">{cityName}</h5>
          </div>
        </div>
      </div>

      {/* Announcements Section */}
      <div className="p-3">
        <div 
          className="announcements-card p-3 rounded-3 position-relative"
          style={{
            background: 'linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%)',
            border: '1px solid #f0c674',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onClick={onCreate}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <i 
                className="bi bi-megaphone me-2" 
                style={{ 
                  fontSize: '1.2rem', 
                  color: '#6c757d' 
                }}
              />
              <span className="fw-bold text-dark">Announcements</span>
            </div>
            <span 
              className="badge bg-danger rounded-pill"
              style={{ fontSize: '0.9rem' }}
            >
              {announcementsCount}
            </span>
          </div>
        </div>
      </div>

      {/* Additional Menu Items */}
      <div className="px-3">
        <div className="list-group list-group-flush">
          <button 
            className="list-group-item list-group-item-action border-0 bg-transparent d-flex align-items-center py-2"
            onClick={onAllAnnouncements}
          >
            <i className="bi bi-list-ul me-2 text-secondary"></i>
            <span>All Announcements</span>
          </button>
          <button 
            className="list-group-item list-group-item-action border-0 bg-transparent d-flex align-items-center py-2"
            onClick={onCreate}
          >
            <i className="bi bi-plus-circle me-2 text-primary"></i>
            <span>New Announcement</span>
          </button>
          <button 
            className="list-group-item list-group-item-action border-0 bg-transparent d-flex align-items-center py-2"
            onClick={onCategories}
          >
            <i className="bi bi-tags me-2 text-info"></i>
            <span>Categories</span>
          </button>
        </div>
      </div>
    </div>
  );
}
