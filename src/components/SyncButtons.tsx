'use client';

import React, { useState, useEffect } from 'react';

interface SyncButtonsProps {
  isConfigured: boolean;
  enquiriesCount: number;
  subscribersCount: number;
}

export const SyncButtons: React.FC<SyncButtonsProps> = ({
  isConfigured,
  enquiriesCount,
  subscribersCount,
}) => {
  const [enquirySyncing, setEnquirySyncing] = useState(false);
  const [subscriberSyncing, setSubscriberSyncing] = useState(false);

  const [enquiryStatus, setEnquiryStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [subscriberStatus, setSubscriberStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [enquiryLastSynced, setEnquiryLastSynced] = useState<string>('');
  const [subscriberLastSynced, setSubscriberLastSynced] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setEnquiryLastSynced(localStorage.getItem('sheet_sync_enquiries_last') || 'Never');
    setSubscriberLastSynced(localStorage.getItem('sheet_sync_subscribers_last') || 'Never');
  }, []);

  const handleSyncEnquiries = async () => {
    if (!isConfigured || enquirySyncing) return;
    setEnquirySyncing(true);
    setEnquiryStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/admin/sync-sheets?type=enquiries', {
        method: 'POST',
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setEnquiryStatus('success');
        const nowStr = new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }) + ' ' + new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        });
        localStorage.setItem('sheet_sync_enquiries_last', nowStr);
        setEnquiryLastSynced(nowStr);
      } else {
        setEnquiryStatus('error');
        setErrorMessage(result.error || 'Failed to sync enquiries');
      }
    } catch (e: any) {
      setEnquiryStatus('error');
      setErrorMessage(e.message || 'Network error occurred');
    } finally {
      setEnquirySyncing(false);
    }
  };

  const handleSyncSubscribers = async () => {
    if (!isConfigured || subscriberSyncing) return;
    setSubscriberSyncing(true);
    setSubscriberStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/admin/sync-sheets?type=subscribers', {
        method: 'POST',
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubscriberStatus('success');
        const nowStr = new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }) + ' ' + new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        });
        localStorage.setItem('sheet_sync_subscribers_last', nowStr);
        setSubscriberLastSynced(nowStr);
      } else {
        setSubscriberStatus('error');
        setErrorMessage(result.error || 'Failed to sync subscribers');
      }
    } catch (e: any) {
      setSubscriberStatus('error');
      setErrorMessage(e.message || 'Network error occurred');
    } finally {
      setSubscriberSyncing(false);
    }
  };

  return (
    <div className="panel-card sync-panel">
      <style>{`
        .sync-panel {
          margin-top: 24px;
          border-left: 4px solid ${isConfigured ? '#4a7c3f' : '#c62828'};
          background-color: #ffffff;
        }

        .sync-title-area {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .sync-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .sync-badge.active {
          background-color: #e8f5e9;
          color: #2e7d32;
        }

        .sync-badge.inactive {
          background-color: #ffebee;
          color: #c62828;
        }

        .sync-actions-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .sync-action-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px;
          border-radius: 8px;
          background: #f7faf7;
          border: 1px solid #edf4ed;
          transition: all 0.2s ease;
        }

        .sync-action-row:hover {
          border-color: #d4af37;
        }

        .sync-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .sync-info-name {
          font-weight: 700;
          color: #132a13;
          font-size: 13px;
        }

        .sync-info-sub {
          font-size: 11px;
          color: #628262;
        }

        .sync-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid #d4af37;
          background-color: #132a13;
          color: #d4af37;
        }

        .sync-btn:hover:not(:disabled) {
          background-color: #d4af37;
          color: #132a13;
          transform: scale(1.02);
        }

        .sync-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .sync-btn.success {
          background-color: #2e7d32;
          color: #ffffff;
          border-color: #2e7d32;
        }

        .sync-btn.error {
          background-color: #c62828;
          color: #ffffff;
          border-color: #c62828;
        }

        /* Error notification */
        .sync-error-box {
          margin-top: 14px;
          padding: 10px 14px;
          background-color: #ffebee;
          border: 1px solid #ffcdd2;
          border-radius: 6px;
          color: #c62828;
          font-size: 11px;
          line-height: 1.4;
          word-break: break-word;
        }

        /* Spinning loader animation */
        .spinner {
          animation: spin 1s linear infinite;
          display: inline-block;
          font-weight: bold;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Guide card style */
        .setup-guide {
          margin-top: 14px;
          padding: 12px;
          background-color: #fff9e6;
          border: 1px solid #ffeeba;
          border-radius: 8px;
          font-size: 12px;
          color: #856404;
        }

        .setup-guide p {
          margin: 0 0 8px 0;
          font-weight: 600;
        }

        .setup-guide ol {
          margin: 0;
          padding-left: 18px;
          line-height: 1.5;
        }

        .setup-guide li {
          margin-bottom: 4px;
        }
      `}</style>

      <div className="sync-title-area">
        <h2>📊 Google Sheets Sync</h2>
        {isConfigured ? (
          <span className="sync-badge active">● Connected</span>
        ) : (
          <span className="sync-badge inactive">● Pending Config</span>
        )}
      </div>

      {!isConfigured ? (
        <div className="setup-guide">
          <p>⚠️ Google Sheets API is not configured yet.</p>
          <ol>
            <li>Create a Google Cloud Service Account.</li>
            <li>Enable Google Sheets API & share your spreadsheet with the service account email.</li>
            <li>Add <code>GOOGLE_SERVICE_ACCOUNT_EMAIL</code>, <code>GOOGLE_PRIVATE_KEY</code>, and <code>GOOGLE_SHEET_ID</code> variables to your <code>.env.local</code> file.</li>
            <li>Restart your development server.</li>
          </ol>
        </div>
      ) : (
        <div className="sync-actions-list">
          {/* Enquiries Row */}
          <div className="sync-action-row">
            <div className="sync-info">
              <span className="sync-info-name">Enquiries ({enquiriesCount})</span>
              <span className="sync-info-sub">Last synced: {enquiryLastSynced}</span>
            </div>
            <button
              onClick={handleSyncEnquiries}
              disabled={enquirySyncing}
              className={`sync-btn ${enquiryStatus === 'success' ? 'success' : enquiryStatus === 'error' ? 'error' : ''}`}
            >
              {enquirySyncing ? (
                <>
                  <span className="spinner">↻</span> Syncing...
                </>
              ) : enquiryStatus === 'success' ? (
                '✓ Synced'
              ) : enquiryStatus === 'error' ? (
                '⚠ Retry'
              ) : (
                'Sync Now'
              )}
            </button>
          </div>

          {/* Subscribers Row */}
          <div className="sync-action-row">
            <div className="sync-info">
              <span className="sync-info-name">Newsletter Subscribers ({subscribersCount})</span>
              <span className="sync-info-sub">Last synced: {subscriberLastSynced}</span>
            </div>
            <button
              onClick={handleSyncSubscribers}
              disabled={subscriberSyncing}
              className={`sync-btn ${subscriberStatus === 'success' ? 'success' : subscriberStatus === 'error' ? 'error' : ''}`}
            >
              {subscriberSyncing ? (
                <>
                  <span className="spinner">↻</span> Syncing...
                </>
              ) : subscriberStatus === 'success' ? (
                '✓ Synced'
              ) : subscriberStatus === 'error' ? (
                '⚠ Retry'
              ) : (
                'Sync Now'
              )}
            </button>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="sync-error-box">
          <strong>Sync failed:</strong> {errorMessage}
        </div>
      )}
    </div>
  );
};
