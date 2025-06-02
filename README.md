# Customer Dashboard

A React-based dashboard for visualizing customer data, including income, age, gender, division, and more. This project uses [Create React App](https://github.com/facebook/create-react-app) and [Recharts](https://recharts.org/) for interactive data visualizations.

## Features
- Admin and Customer dashboards
- Interactive charts (bar, pie, scatter, etc.)
- Filtering by division and gender
- Responsive, dark-themed UI

## Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   cd customer-dashboard
   npm start
   ```
   This will launch the app at [http://localhost:3000](http://localhost:3000).

## For Task 1(a&b)
 ```bash
  cd Task1
   ```
   ## 'go live' task1a.html & task1b.html

## Project Structure
- `src/assets/customers.json` — Customer data source
- `src/components/` — Reusable chart and UI components
- `src/pages/` — Dashboard pages for Admin and Customer roles

## Customization
- To update customer data, edit `src/assets/customers.json`.
- To add new charts or features, create new components in `src/components/` and import them into the relevant dashboard page.

