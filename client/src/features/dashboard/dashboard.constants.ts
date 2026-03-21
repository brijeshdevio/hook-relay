function randomId() {
    return Math.random().toString(36).substring(2, 10);
}

function randomNumber(max = 1000) {
    return Math.floor(Math.random() * max);
}

function randomUrl(type) {
    const domains = ["api.example.com", "hooks.service.io", "webhook.site", "internal.app"];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `https://${domain}/${type}/${randomId()}`;
}

function randomDate() {
    const now = Date.now();
    const past = now - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30); // last 30 days
    return new Date(past).toISOString();
}

function generateEndpoint() {
    const totalReceived = randomNumber(1000);
    const totalDelivered = Math.floor(totalReceived * Math.random());
    const totalFailed = totalReceived - totalDelivered;

    return {
        id: randomId(),
        name: `Endpoint-${randomId()}`,
        listenUrl: randomUrl("listen"),
        forwardUrl: randomUrl("forward"),
        isActive: Math.random() > 0.3,
        totalReceived,
        totalDelivered,
        totalFailed,
        lastReceivedAt: randomDate()
    };
}

function generateEndpoints(count = 10) {
    return Array.from({ length: count }, generateEndpoint);
}

export const ENDPOINTS = generateEndpoints(8);
