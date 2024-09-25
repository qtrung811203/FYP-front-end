import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
:root {
  /* Brand Color */
  --primary-color: #16423C;
  --secondary-color: #6A9C89;
  --third-color: #C4DAD2;
  --fourth-color: #E9EFEC;

/* Primary Color Family */
  --darkest-teal: #0B211E;
  --dark-teal: #16423C;
  --medium-teal: #1E5750;
  --light-teal: #267264;

  /* Secondary Color Family */
  --dark-sage: #4A6D5F;
  --medium-sage: #6A9C89;
  --light-sage: #8ABBA8;
  --pale-sage: #A9D0C3;

  /* Tertiary Color Family */
  --dark-mint: #9FBEB6;
  --medium-mint: #C4DAD2;
  --light-mint: #D6E6E0;
  --pale-mint: #E9EFEC;

  /* Accent Colors */
  --warm-accent: #D68060;
  --cool-accent: #60A1D6;

  /* Neutral Colors */
  --dark-gray: #333333;
  --medium-gray: #666666;
  --light-gray: #999999;
  --off-white: #F5F5F5;

  /* Grey */
  --color-grey-0: #fff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #f3f4f6;
  --color-grey-200: #e5e7eb;
  --color-grey-300: #d1d5db;
  --color-grey-400: #9ca3af;
  --color-grey-500: #6b7280;
  --color-grey-600: #4b5563;
  --color-grey-700: #374151;
  --color-grey-800: #1f2937;
  --color-grey-900: #111827;

  --color-blue-100: #e0f2fe;
  --color-blue-700: #0369a1;
  --color-green-100: #dcfce7;
  --color-green-700: #15803d;
  --color-yellow-100: #fef9c3;
  --color-yellow-700: #a16207;
  --color-silver-100: #e5e7eb;
  --color-silver-700: #374151;
  --color-indigo-100: #e0e7ff;
  --color-indigo-700: #4338ca;

  --color-red-100: #fee2e2;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --backdrop-color: rgba(255, 255, 255, 0.1);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
  --shadow-card: 0.3rem 0.5rem 0.5rem rgba(0, 0, 0, 0.08);

  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;

  /* FontSize */
  --font-size-xs: 1rem;
  --font-size-sm: 1.2rem;
  --font-size-md: 1.4rem;
  --font-size-lg: 1.6rem;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Montserrat", sans-serif;
  color: #516677;
  min-height: 100vh;
  line-height: 1.5;
  font-size: var(--font-size-md);
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

//Resonsive
@media (max-width: 480px) {
  :root {
  --font-size-xs: 0.3rem;
  --font-size-sm: 0.5rem;
  --font-size-md: 0.8rem;
  --font-size-lg: 1rem;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  :root {
  --font-size-xs: 0.5rem;
  --font-size-sm: 0.8rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.2rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  :root {
  --font-size-xs: 0.8rem;
  --font-size-sm: 1rem;
  --font-size-md: 1.2rem;
  --font-size-lg: 1.4rem;
  }
}

@media (min-width: 1025px) and (max-width: 1280px) {
  :root {
  --font-size-xs: 1rem;
  --font-size-sm: 1.2rem;
  --font-size-md: 1.4rem;
  --font-size-lg: 1.6rem;
  }
}
`

export default GlobalStyles
