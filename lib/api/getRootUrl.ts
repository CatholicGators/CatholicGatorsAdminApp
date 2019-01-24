export default function getRootUrl() {
    const port = process.env.PORT || 8000;
    const dev = process.env.NODE_ENV !== 'production';
    const ROOT_URL = dev ? `http://localhost:${port}` : 'https://catholicgatorsadmin.org';

    return ROOT_URL;
}