export function createBook(title, author, pages, read) {
  const id = crypto.randomUUID();

  return { id, title, author, pages, read };
}
