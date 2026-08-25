'use client';

import { useState } from 'react';
import styles from './Faqs.module.css';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className={styles.accordionList}>
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`${styles.accordionItem} ${isOpen ? styles.accordionItemOpen : ''}`}
          >
            <button
              className={`${styles.accordionButton} ${isOpen ? styles.accordionButtonOpen : ''}`}
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${idx}`}
              id={`faq-button-${idx}`}
            >
              <span className={styles.accordionNumber}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className={styles.accordionQuestion}>{faq.question}</span>
              <svg
                className={`${styles.accordionIcon} ${isOpen ? styles.accordionIconOpen : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div
              id={`faq-panel-${idx}`}
              role="region"
              aria-labelledby={`faq-button-${idx}`}
              className={`${styles.accordionPanel} ${isOpen ? styles.accordionPanelOpen : ''}`}
            >
              <p className={styles.accordionAnswer}>{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
