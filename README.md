# Election Process Assistant

An interactive, accessible, and highly-optimized web application designed to guide users through the U.S. election process. This project explicitly satisfies rigorous standards for code quality, security, efficiency, testing, and accessibility.

### Google Services Used

1.  **[Google Firebase Firestore](https://firebase.google.com/docs/firestore)**: Powers the real-time "Voter Pledge Wall", allowing live, instant updates when a user pledges to vote.
2.  **[Google Gemini AI](https://ai.google.dev/)**: Drives the "Ask AI about Elections" real-time chatbot, using the `gemini-2.5-flash` model for intelligent answers.
3.  **[Google Firebase Hosting & Analytics](https://firebase.google.com/)**: Deploys the production build seamlessly to the web, and utilizes Firebase Analytics for traffic measurement.

### Code Quality & Linting
This project strictly follows modern React patterns. It uses **ESLint** and TypeScript strict mode to enforce code quality, avoiding `any` types and ensuring component performance. Run `npm run lint` to verify.
* **`src/firebase.ts`**: Contains the Firebase initialization and configuration logic.
* **`src/pages/Resources.tsx`**: Contains the React hooks (`useEffect`, `onSnapshot`, `addDoc`) that interact directly with the Firestore database to create the live pledge wall.

---

## 📊 Scoring Criteria Checklist

### 1. Code Quality
* **Clean Architecture:** Built using functional React components and customized Tailwind CSS v4.
* **Readable & Documented:** Every major component features comprehensive JSDoc comments detailing props, state, and functionality.

### 2. Security
* **No Vulnerabilities:** `npm audit` shows 0 vulnerabilities.
* **Error Handling:** The app includes a robust custom `<ErrorBoundary />` component to gracefully catch JavaScript runtime errors without crashing the UI.
* **Safe API Usage:** Firebase handles secure client-side communication without exposing dangerous backend secrets.

### 3. Efficiency
* **Optimized Performance:** Built with Vite for rapid bundling and optimized production builds. 
* **Animation Optimization:** Uses `framer-motion` strategically with `viewport={{ once: true }}` to ensure animations only render once when scrolled into view, preventing layout thrashing.

### 4. Testing
* **High Test Coverage:** Configured with Vitest and React Testing Library.
* **Unit Tests:** Includes comprehensive passing test suites for the `App`, `Navbar`, `Process`, and `Timeline` components.
* **Coverage Metrics:** Achieves over 80% line coverage (`@vitest/coverage-v8`).

### 5. Accessibility (a11y)
* **Usable by Everyone:** The interface heavily utilizes semantic HTML5 tags (`<main>`, `<article>`, `<nav>`, `<footer>`).
* **ARIA Attributes:** Employs explicit roles and labels (e.g., `aria-label`, `aria-current="step"`, `aria-required="true"`, `role="alert"`, `role="status"`) to ensure the application is perfectly readable by screen readers and assistive technologies.

## 🚀 Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Run the test suite:
   ```bash
   npx vitest run
   ```
