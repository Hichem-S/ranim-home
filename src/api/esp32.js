// Sensor data arrives via SSE (see hooks/useSseData.js) — no direct ESP32 polling.
// Servo commands are sent to the backend, which publishes them over MQTT.

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

export async function controlServo(action) {
  const res = await fetch(`${BACKEND_URL}/api/servo/${action}`, {
    method: 'POST',
    signal: AbortSignal.timeout(5000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
