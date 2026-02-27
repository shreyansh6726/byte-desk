#  ByteDesk | Professional Workspace Solution

ByteDesk is a high-performance, minimalist workspace application designed for seamless collaboration and productivity. Featuring a "secure-first" architecture, fluid motion transitions, and a responsive whiteboard environment, ByteDesk bridges the gap between simplicity and professional utility.

---

##  Key Features

###  Advanced Authentication Flow
- **Smart Progress Syncing:** Visual feedback that communicates server status (ideal for cold-starting backends like Render).
- **Session Persistence:** Intelligent "Keep me logged in" logic utilizing both `localStorage` and `sessionStorage` for a persistent user experience even on refreshes.
- **Dynamic Re-authentication:** A signature "Welcome Back" sequence that validates existing sessions with high-end animations.

###  Premium User Experience
- **Fluid UI Transitions:** Powered by `Framer Motion` for layout transitions, modal overlays, and success/logout sequences.
- **Adaptive Loading:** Logic-driven progress bars that "zip" to completion upon server response, providing a snappy feel.
- **Celebration Logic:** Integrated `canvas-confetti` celebrations upon successful registration.

###  Core Tools
- **Interactive Whiteboard:** A low-latency creative space for brainstorming and visualization.
- **Security-First Forms:** Custom password strength validation with real-time feedback and consecutive character detection.

---

##  Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Framed Motion, React Router v6 |
| **Styling** | Modern CSS-in-JS (Standardized Inter Font Family) |
| **Backend** | Node.js / Express (Hosted on Render) |
| **Animations** | Framer Motion, Canvas-Confetti |

---

##  Project Structure

```text
src/
├── components/
│   ├── LandingPage.jsx     # High-conversion entry point
│   ├── LoginForm.jsx       # Auth logic with smart progress bar
│   ├── SignupForm.jsx      # Celebration-enabled registration
│   ├── MainLayout.jsx      # Persistent sidebar and navigation
│   ├── Home.jsx            # Personalized user dashboard
│   └── Whiteboard.jsx      # Canvas-based creative tool
├── App.js                  # Central Routing & Session Management
└── index.js                # Global Styles & Entry
```
##  Installation & Setup
Clone the repository:

Bash
```
git clone [https://github.com/your-username/byte-desk.git](https://github.com/your-username/byte-desk.git)
cd byte-desk
```
## Install dependencies:

Bash
```npm install```
Configure the Environment: The application automatically toggles between local and production APIs:

```
Local: http://localhost:5000

Production: https://byte-desk.onrender.com

```
Run the Application:
Bash ->
```npm start```

##  Security & Session Logic

ByteDesk utilizes a dual-storage strategy to balance security and convenience:

Persistent Login: If "Remember Me" is checked, the user object is stored in localStorage.

Session Login: If unchecked, data resides in sessionStorage (clears when the tab closes).

Session Handshake: A session_active key in sessionStorage prevents the re-authentication animation from playing on every single internal page change, only triggering on a fresh entry or refresh.

 Mobile Support
ByteDesk is fully responsive. The navigation architecture transitions from a sidebar to a mobile-optimized layout, ensuring that core tools like the Whiteboard remain functional on touch devices.

 License
Distributed under the MIT License. See LICENSE for more information.
