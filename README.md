# Cortexa Vora Trading Journal

A no-build browser trading journal with:

- Username and password accounts
- Email captured during registration for local password recovery
- First account/admin fallback with an Administration panel
- Admin brand controls for app name, dashboard quote, and uploaded logo
- Separate trade data for each user
- Dashboard cards for trades, win rate, P&L, and average R:R
- New/edit trade form, trade log, statistics charts, pie chart, and calendar

Open `index.html` in a browser to use it.

This is a local prototype. Account data, uploaded logo, settings, and trades are stored in the browser's `localStorage`, so it is separated per username on the same browser but is not a production backend. The password recovery flow checks the registered email locally; real email delivery needs a backend email service.
