function sanitizeUrl(url: string) {
    if (
        url.startsWith("http://") ||
        url.startsWith("https://")
    ) {
        return url;
    }
    return "https://" + url;
}

export default sanitizeUrl;
