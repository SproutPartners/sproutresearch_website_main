# Sprout Research Accessibility Remediation Report

## Scope
This remediation targets the public pages called out in the audit for www.sproutresearch.in, including Home, Charter, Contact, Report, Refund and Cancellation, Retail Research, PCG Research, Insights, Privacy Policy, Pricing, Disclaimer, Terms, and Grievance.

## Main WCAG remediation areas addressed

### 1. Contrast and readability
- Added global accessible design tokens.
- Strengthened weak grey and blue text colours.
- Added global focus-visible outlines.
- Added reduced-motion support for users who prefer less animation.

### 2. Landmarks and navigation
- Added a skip-to-main-content link.
- Added one main landmark with `id="main-content"`.
- Added `role="banner"` to the header.
- Added `role="contentinfo"` to the footer.
- Rebuilt the header with accessible desktop and mobile navigation.
- Rebuilt the footer with accessible legal, contact, useful-link, and service navigation.

### 3. Name, role, value
- Added accessible names to menu buttons, social links, grievance links, email/phone links, and mobile navigation controls.
- Added `aria-expanded`, `aria-controls`, and `aria-haspopup` to dropdown menus.
- Added Escape-key closing support for menus.
- Added fieldset/legend grouping for contact form checkboxes.
- Added labels for contact form fields.
- Added live regions for contact form success and error messages.

### 4. Link purpose
- Replaced an empty `href` link.
- Replaced button-inside-link patterns with accessible link buttons.
- Added clear ARIA labels for external grievance and regulatory links.
- Improved footer link names.

### 5. Non-text content
- Replaced generic alt text such as `Background`, `Logo`, and `Company Logo` with descriptive alternatives.
- Updated Sprout logo alt text.
- Marked decorative SVG icons as hidden from assistive technologies.

### 6. Headings and document titles
- Reduced multiple public-page heading hierarchy issues.
- Added a dynamic page-title component for unique browser titles across public routes.
- Kept a single visible H1 on key audited public pages.

### 7. Build and deployment hardening
- Removed runtime dependency on `next/font/google`, avoiding external font fetch issues during builds.
- Fixed duplicate `UserAuthProvider` wrapping.
- Added safe Firebase fallback configuration so builds do not fail when environment variables are unavailable in non-production checks.
- Added missing Firebase `storage` export used by the upload form.

## Validation status
- `npm install` completed successfully.
- `next build` compilation completed successfully.
- The sandbox build progressed beyond compilation and TypeScript, then timed out during static page generation because the environment has execution limits. The code compiled successfully before that limit.

## Post-deployment checks still required
- Deploy to Vercel preview first, not direct production.
- Run Lighthouse Accessibility on all audited URLs.
- Run WAVE and axe DevTools on all audited URLs.
- Manually test keyboard navigation, focus order, menu operation, form submission, browser zoom, and screen-reader navigation.
- Ask the auditor to re-test before claiming full WCAG 2.1 AA compliance.
