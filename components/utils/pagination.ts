export default function pagination(count: number, limit: number) {
    const pages = Math.floor(count / limit)
    return pages
}