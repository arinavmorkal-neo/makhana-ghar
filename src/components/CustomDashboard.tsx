import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export const CustomDashboard = async () => {
  const payload = await getPayload({ config: configPromise });

  // Fetch collections stats
  const pagesResult = await payload.find({
    collection: 'pages',
    limit: 100,
    sort: '-updatedAt',
  });

  const mediaCountResult = await payload.count({
    collection: 'media',
  });

  const usersCountResult = await payload.count({
    collection: 'users',
  });

  const blogsCountResult = await payload.count({
    collection: 'blogs',
  });

  const totalPages = pagesResult.totalDocs;
  const totalMedia = mediaCountResult.totalDocs;
  const totalUsers = usersCountResult.totalDocs;
  const totalBlogs = blogsCountResult.totalDocs;
  const pagesList = pagesResult.docs;

  return (
    <div className="custom-dash-container">
      <style>{`
        .custom-dash-container {
          padding: 32px;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          color: #1c2e1c;
          background-color: #f7faf7;
          min-height: 100vh;
        }

        .custom-dash-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          border-bottom: 2px solid #e1ebe1;
          padding-bottom: 20px;
        }

        .custom-dash-title h1 {
          font-size: 28px;
          font-weight: 800;
          color: #132a13;
          margin: 0 0 6px 0;
          letter-spacing: -0.5px;
        }

        .custom-dash-title p {
          color: #4a724a;
          margin: 0;
          font-size: 14px;
        }

        .store-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: #132a13;
          color: #d4af37;
          border: 1px solid #d4af37;
          padding: 10px 20px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .store-btn:hover {
          background-color: #d4af37;
          color: #132a13;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.2);
        }

        /* Stats Cards */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(26, 58, 26, 0.04);
          border: 1px solid #e1ebe1;
          display: flex;
          align-items: center;
          gap: 20px;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 28px rgba(26, 58, 26, 0.08);
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: #d4af37;
        }

        .stat-card.pages::before { background: #d4af37; }
        .stat-card.media::before { background: #4a7c3f; }
        .stat-card.users::before { background: #8b5a2b; }
        .stat-card.blogs::before { background: #2e7d32; }

        .stat-icon {
          width: 54px;
          height: 54px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        .stat-card.pages .stat-icon { background: #fdf8e7; color: #d4af37; }
        .stat-card.media .stat-icon { background: #eef7ee; color: #4a7c3f; }
        .stat-card.users .stat-icon { background: #f9f2eb; color: #8b5a2b; }
        .stat-card.blogs .stat-icon { background: #e8f5e9; color: #2e7d32; }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-number {
          font-size: 32px;
          font-weight: 800;
          color: #132a13;
          line-height: 1;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 13px;
          color: #557055;
          font-weight: 500;
        }

        /* Layout Grid */
        .dashboard-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 32px;
        }

        @media (max-width: 992px) {
          .dashboard-content {
            grid-template-columns: 1fr;
          }
        }

        .panel-card {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e1ebe1;
          box-shadow: 0 4px 20px rgba(26, 58, 26, 0.04);
          padding: 28px;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .panel-header h2 {
          font-size: 18px;
          font-weight: 700;
          color: #132a13;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Tables */
        .pages-table-wrapper {
          overflow-x: auto;
        }

        .pages-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .pages-table th {
          padding: 12px 16px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          color: #4a724a;
          border-bottom: 2px solid #edf4ed;
          letter-spacing: 0.5px;
        }

        .pages-table td {
          padding: 16px;
          font-size: 14px;
          border-bottom: 1px solid #edf4ed;
          color: #2c422c;
        }

        .pages-table tr:hover td {
          background-color: #fafdfa;
        }

        .page-title-cell {
          font-weight: 600;
          color: #132a13;
        }

        .page-slug-badge {
          background-color: #edf4ed;
          color: #2a592a;
          padding: 4px 8px;
          border-radius: 6px;
          font-family: monospace;
          font-size: 12px;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .status-badge.published {
          background-color: #e3f7e3;
          color: #1e5a1e;
        }

        .status-badge.draft {
          background-color: #f7ede3;
          color: #8b5a2b;
        }

        .action-links {
          display: flex;
          gap: 12px;
        }

        .edit-link {
          color: #4a7c3f;
          text-decoration: none;
          font-weight: 600;
          font-size: 13px;
        }

        .edit-link:hover {
          color: #132a13;
          text-decoration: underline;
        }

        .view-link {
          color: #8a7332;
          text-decoration: none;
          font-weight: 600;
          font-size: 13px;
        }

        .view-link:hover {
          color: #d4af37;
          text-decoration: underline;
        }

        /* Quick actions side panel */
        .quick-actions-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .action-card-btn {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px;
          background: #ffffff;
          border: 1px solid #e1ebe1;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .action-card-btn:hover {
          border-color: #d4af37;
          background-color: #fdfdfd;
          transform: translateX(4px);
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.08);
        }

        .action-card-btn .action-icon {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .action-card-btn.create .action-icon { background: #fdf8e7; color: #d4af37; }
        .action-card-btn.media .action-icon { background: #eef7ee; color: #4a7c3f; }
        .action-card-btn.cache .action-icon { background: #f9ebeb; color: #c62828; }
        .action-card-btn.blog .action-icon { background: #e8f5e9; color: #2e7d32; }

        .action-text {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .action-title {
          font-weight: 700;
          color: #132a13;
          font-size: 14px;
        }

        .action-desc {
          font-size: 12px;
          color: #628262;
          margin-top: 2px;
        }

        .empty-pages {
          text-align: center;
          padding: 40px 20px;
          color: #557055;
        }

        .empty-pages p {
          margin-bottom: 20px;
        }

        .create-first-btn {
          display: inline-flex;
          background-color: #d4af37;
          color: #132a13;
          padding: 10px 20px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 700;
          font-size: 14px;
          transition: background-color 0.2s;
        }

        .create-first-btn:hover {
          background-color: #c49d2b;
        }
      `}</style>

      {/* Header */}
      <div className="custom-dash-header">
        <div className="custom-dash-title">
          <h1>Makhana Ghar CMS Dashboard</h1>
          <p>Manage storefront pages, product catalogs, and assets</p>
        </div>
        <a href="/" target="_blank" className="store-btn">
          <span>👁</span> View Storefront
        </a>
      </div>

      {/* Stats row */}
      <div className="stats-grid">
        <div className="stat-card pages">
          <div className="stat-icon">📄</div>
          <div className="stat-info">
            <span className="stat-number">{totalPages}</span>
            <span className="stat-label">Total Pages</span>
          </div>
        </div>
        <div className="stat-card media">
          <div className="stat-icon">🖼</div>
          <div className="stat-info">
            <span className="stat-number">{totalMedia}</span>
            <span className="stat-label">Media Items</span>
          </div>
        </div>
        <div className="stat-card users">
          <div className="stat-icon">👤</div>
          <div className="stat-info">
            <span className="stat-number">{totalUsers}</span>
            <span className="stat-label">Admin Users</span>
          </div>
        </div>
        <div className="stat-card blogs">
          <div className="stat-icon">✍️</div>
          <div className="stat-info">
            <span className="stat-number">{totalBlogs}</span>
            <span className="stat-label">Blog Posts</span>
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="dashboard-content">
        {/* Pages Panel */}
        <div className="panel-card">
          <div className="panel-header">
            <h2>📝 Storefront Pages Overview</h2>
          </div>

          <div className="pages-table-wrapper">
            {pagesList.length === 0 ? (
              <div className="empty-pages">
                <p>No pages created yet. Let's create your homepage first!</p>
                <a href="/admin/collections/pages/create" className="create-first-btn">
                  + Create Homepage
                </a>
              </div>
            ) : (
              <table className="pages-table">
                <thead>
                  <tr>
                    <th>Page Title</th>
                    <th>Slug</th>
                    <th>Status</th>
                    <th>Last Updated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pagesList.map((page) => {
                    const updatedAt = new Date(page.updatedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    });
                    const isHome = page.slug === 'home' || page.slug === 'index';
                    const liveUrl = isHome ? '/' : `/${page.slug}`;

                    return (
                      <tr key={page.id}>
                        <td className="page-title-cell">{page.title}</td>
                        <td>
                          <span className="page-slug-badge">/{page.slug}</span>
                        </td>
                        <td>
                          <span className="status-badge published">Published</span>
                        </td>
                        <td>{updatedAt}</td>
                        <td className="action-links">
                          <a href={`/admin/collections/pages/${page.id}`} className="edit-link">
                            ✏️ Edit
                          </a>
                          <a href={liveUrl} target="_blank" className="view-link">
                            👁 View Live
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="panel-card">
          <div className="panel-header">
            <h2>⚡ Quick Actions</h2>
          </div>

          <div className="quick-actions-list">
            <a href="/admin/collections/pages/create" className="action-card-btn create">
              <div className="action-icon">➕</div>
              <div className="action-text">
                <span className="action-title">Create Page</span>
                <span className="action-desc">Add a new page for future routes</span>
              </div>
            </a>

            <a href="/admin/collections/media" className="action-card-btn media">
              <div className="action-icon">🖼</div>
              <div className="action-text">
                <span className="action-title">Media Library</span>
                <span className="action-desc">Upload or browse ImageKit media assets</span>
              </div>
            </a>

            <a href="/admin/collections/blogs/create" className="action-card-btn blog">
              <div className="action-icon">✍️</div>
              <div className="action-text">
                <span className="action-title">Create Blog Post</span>
                <span className="action-desc">Write and publish a new blog article</span>
              </div>
            </a>

            <a href="/admin/collections/users" className="action-card-btn cache">
              <div className="action-icon">⚙️</div>
              <div className="action-text">
                <span className="action-title">Manage Admins</span>
                <span className="action-desc">Manage admin team login credentials</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
