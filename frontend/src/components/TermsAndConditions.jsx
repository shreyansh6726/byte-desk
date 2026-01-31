import React from 'react';
import { motion } from 'framer-motion';

const TermsAndConditions = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using ByteDesk Pro, you agree to be bound by these Terms and Conditions. Our workspace is designed for corporate productivity; unauthorized commercial redistribution of our internal tools is strictly prohibited."
    },
    {
      title: "2. User Accounts & Security",
      content: "Users are responsible for maintaining the confidentiality of their session data. ByteDesk utilizes local and session storage to enhance performance; however, users must ensure they logout from shared terminals to prevent unauthorized access to their creative workspace."
    },
    {
      title: "3. Intellectual Property",
      content: "All drawings, documents, and digital assets created on the ByteDesk Whiteboard remain the property of the creator or their respective organization. ByteDesk claims no ownership over your data, but reserves rights over the platform's underlying proprietary source code and interface design."
    },
    {
      title: "4. Acceptable Use Policy",
      content: "The platform must not be used for storing or transmitting malicious code, infringing on third-party copyrights, or engaging in activities that disrupt the productivity of other team members within the collaborative environment."
    },
    {
      title: "5. Data Privacy & Persistence",
      content: "ByteDesk offers local persistence features (like the Whiteboard auto-save). While we strive for 100% data integrity, users are encouraged to utilize the 'Download' feature to export critical work. We are not liable for data loss resulting from cleared browser caches or hardware failure."
    },
    {
      title: "6. Limitation of Liability",
      content: "ByteDesk is provided 'as-is'. In no event shall ByteDesk be liable for any indirect, incidental, or consequential damages arising out of the use or inability to use the productivity suite."
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      style={styles.container}
    >
      <header style={styles.header}>
        <h1 style={styles.title}>Terms and Conditions</h1>
        <p style={styles.lastUpdated}>Last Updated: January 2026</p>
      </header>

      <div style={styles.contentBox}>
        {sections.map((section, index) => (
          <div key={index} style={styles.section}>
            <h2 style={styles.sectionTitle}>{section.title}</h2>
            <p style={styles.sectionText}>{section.content}</p>
          </div>
        ))}
      </div>

      <footer style={styles.footer}>
        <p>© 2026 ByteDesk Pro Productivity Suite. All rights reserved.</p>
      </footer>
    </motion.div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: '"Inter", sans-serif',
    color: '#1e293b',
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px',
  },
  title: {
    fontSize: '42px',
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: '10px',
  },
  lastUpdated: {
    color: '#64748b',
    fontSize: '14px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  contentBox: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '24px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
  },
  section: {
    marginBottom: '30px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '12px',
  },
  sectionText: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#475569',
  },
  footer: {
    marginTop: '50px',
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: '14px',
  }
};

export default TermsAndConditions;