# Food Delivery UIWebApp

## Overview

This is the React.js (Next.js) frontend for the Food Delivery platform.  
Features:
- User authentication (Sign up / Login)
- Browse restaurants and menus
- Search/filter by restaurant/cuisine/dish
- Cart management and checkout
- Track order status

## Setup

1. Copy `.env.example` to `.env` and set `NEXT_PUBLIC_API_BASE_URL`.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Project Structure

- `/components` - Shared React components (buttons, forms, navigation, etc.)
- `/pages` - Route-based Next.js pages for app views
- `/services` - API service layer (Axios, backend integration)
- `/contexts` - App context providers (auth, cart, global state)
- `/styles` - CSS modules / global styles

## Env Variables

- `NEXT_PUBLIC_API_BASE_URL` (required): URL for the backend API gateway.
