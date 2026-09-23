'use client';

import styles from './WhatsAppFloating.module.css';

interface WhatsAppFloatingProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export default function WhatsAppFloating({
  phoneNumber = '918002661555',
  defaultMessage = 'I am interested in Makhana; please share your price details.',
}: WhatsAppFloatingProps) {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <aside className={styles.whatsappContainer} aria-label="WhatsApp Contact">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsappButton}
        aria-label="Chat with Makhana Ghar on WhatsApp"
        title="Chat on WhatsApp"
      >
        <span className={styles.pulseWave} aria-hidden="true" />
        
        {/* WhatsApp Official Vector Icon */}
        <svg
          className={styles.whatsappIcon}
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M16 2.5C8.544 2.5 2.5 8.544 2.5 16c0 2.628.75 5.08 2.053 7.153L3 29.5l6.568-1.52A13.436 13.436 0 0016 29.5c7.456 0 13.5-6.044 13.5-13.5S23.456 2.5 16 2.5zm0 24.636c-2.296 0-4.453-.664-6.28-1.808l-.45-.28-4.148.96 1.002-3.992-.295-.468A11.144 11.144 0 014.864 16C4.864 9.86 9.86 4.864 16 4.864S27.136 9.86 27.136 16 22.14 27.136 16 27.136zm6.818-8.777c-.373-.187-2.207-1.089-2.55-1.213-.342-.125-.59-.187-.84.187-.248.373-.964 1.213-1.182 1.462-.218.249-.436.28-.809.094a10.22 10.22 0 01-3.003-1.854 11.272 11.272 0 01-2.079-2.587c-.218-.374-.023-.576.164-.762.168-.168.374-.436.56-.654.187-.218.249-.374.374-.623.125-.25.062-.467-.031-.654-.094-.187-.84-2.024-1.152-2.772-.303-.728-.612-.629-.84-.641l-.717-.012c-.25 0-.654.094-.996.467s-1.308 1.277-1.308 3.114c0 1.838 1.34 3.613 1.526 3.863.187.249 2.637 4.027 6.39 5.648.893.385 1.59.615 2.133.788.897.285 1.713.245 2.358.149.72-.108 2.207-.903 2.518-1.774.312-.872.312-1.62.218-1.775-.093-.156-.342-.25-.716-.436z" />
        </svg>

        {/* Tooltip on Desktop hover */}
        <span className={styles.tooltip}>
          Chat with us on WhatsApp
        </span>
      </a>
    </aside>
  );
}
