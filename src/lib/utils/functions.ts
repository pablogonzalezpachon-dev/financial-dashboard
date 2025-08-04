import z from "zod";

export function getZodErrors(error: z.ZodError) {
  const errorMap: Record<string, string> = {};
  error.issues.forEach((issue) => {
    const field = issue.path[0] as string;
    errorMap[field] = issue.message;
  });
  return errorMap;
}

export function getVisiblePages(
  currentPage: number,
  totalPages: number
): (number | "...")[] {
  const pages: (number | "...")[] = [];

  if (totalPages <= 4) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  if (currentPage > totalPages) {
    return [];
  } else if (currentPage < 0) {
    return [];
  }
  pages.push(1);

  if (currentPage <= 2) {
    if (totalPages > 1) pages.push(2);
    if (totalPages > 2) pages.push(3);
  } else {
    if (currentPage > 3) {
      pages.push("...");
    }
    if (currentPage - 1 > 1) pages.push(currentPage - 1);
    if (currentPage !== 1 && currentPage !== totalPages)
      pages.push(currentPage);
    if (currentPage + 1 < totalPages) pages.push(currentPage + 1);
  }
  if (currentPage < totalPages - 2) {
    pages.push("...");
  }
  if (totalPages > 1) pages.push(totalPages);
  return pages;
}
