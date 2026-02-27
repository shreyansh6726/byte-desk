# Security Policy

##  ByteDesk Security Commitment
ByteDesk is committed to providing a secure and productive environment for all users. We prioritize the safety of user data through a "secure-first" architecture and follow industry best practices for authentication and data protection.

##  Supported Versions
Currently, only the latest version of ByteDesk is supported for security updates.

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |
| < 0.1.0 | :x:                |

##  Implemented Security Features

###  Backend Security
- **Credential Hashing:** Passwords are never stored in plain text. We utilize `bcryptjs` with a high salt factor (10) for robust one-way hashing.
- **Cross-Origin Resource Sharing (CORS):** The API is locked down to specific allowed origins (`https://byte-desk.vercel.app`) to prevent unauthorized cross-site requests.
- **Input Validation:** Strict server-side validation for login and signup payloads.

###  Frontend Security
- **Dual-Storage Strategy:** 
    - **Session Storage:** Used for temporary data that clears when the browser tab is closed.
    - **Local Storage:** Used only for persistent "Remember Me" sessions, balancing convenience with security.
- **Password Strength Validation:** Real-time feedback and consecutive character detection to encourage strong user credentials.
- **Secure Handling of IDs:** User identification is handled via unique `user_id` tokens.

##  Reporting a Vulnerability
We value the work of security researchers in keeping our community safe. If you discover a security vulnerability within ByteDesk, please report it to us as soon as possible.

###  Process
1. **Email us:** Send a detailed report to [shreyansh.official.6726@gmail.com](https://mail.google.com/mail/?view=cm&fs=1&to=shreyansh.official.6726@gmail.com).
2. **Details:** Include a description of the vulnerability, steps to reproduce, and any potential impact.
3. **Response:** We aim to acknowledge receipt of your report within 48 hours and provide a timeline for a resolution.

*Please do not open public issues for security vulnerabilities. We appreciate your responsible disclosure.*

##  Security Updates
Security patches and updates will be detailed in our repository's release notes. We recommend keeping your local installation synchronized with the latest main branch.
