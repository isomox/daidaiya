# Issue

When we try to get the image from `https://0366-240e-469-2e06-9540-e0f0-f2b5-d2d8-8a24.ngrok-free.app/putImage`, it returns a PNG image. However, on the first request, it forwards to another page instead of returning the image.

## Reason

Ngrok forwards the request to another page initially. We need to perform some operations to make the request work normally. Below are the solutions:

- Set and send an `ngrok-skip-browser-warning` request header with any value.
- Set and send a custom/non-standard browser `User-Agent` request header.
- Upgrade to any paid ngrok account.

## Solution

We chose the first solution: set and send an `ngrok-skip-browser-warning` request header with any value.
