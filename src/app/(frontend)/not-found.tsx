import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileNavBar from '../components/MobileNavBar';

export default function NotFound() {
  return (
    <main>
      <Header />
      <section
        style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '80px 20px',
          fontFamily: 'var(--font-poppins), sans-serif',
          background: 'linear-gradient(180deg, #fdfbf7 0%, #f4eee3 100%)',
        }}
      >
        <div style={{ maxWidth: 540 }}>
          <div
            style={{
              fontSize: '84px',
              fontWeight: 800,
              color: '#2e7d32',
              lineHeight: 1,
              marginBottom: 12,
            }}
          >
            404
          </div>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#1a1a1a',
              marginBottom: 12,
            }}
          >
            Page or Product Not Found
          </h1>
          <p
            style={{
              fontSize: '16px',
              color: '#666',
              lineHeight: 1.6,
              marginBottom: 28,
            }}
          >
            The link you followed may be outdated or the product may have been moved.
            Explore our wide range of premium Makhana grades and products below.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/categories"
              style={{
                backgroundColor: '#2e7d32',
                color: '#fff',
                padding: '12px 28px',
                borderRadius: '8px',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                transition: 'background 0.2s',
              }}
            >
              Browse Products →
            </Link>
            <Link
              href="/"
              style={{
                backgroundColor: '#fff',
                color: '#333',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: 600,
                textDecoration: 'none',
                border: '1px solid #ddd',
                display: 'inline-flex',
                alignItems: 'center',
                transition: 'background 0.2s',
              }}
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </section>
      <Footer />
      <MobileNavBar />
    </main>
  );
}
