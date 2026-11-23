# App offline blank screen

## Goal
Take the prototype offline without deleting any content. Visitors see a blank screen; no route or UI is reachable.

## Approach
Hard gate in `lucas-oil/main.tsx`: when `APP_OFFLINE` is `true`, render an empty full-viewport element and do not mount `AuthProvider` / `RouterProvider`. All pages and components remain on disk.

## Restore
Set `APP_OFFLINE` to `false` (or remove the gate) and reload.
