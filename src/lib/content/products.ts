export function getFilteredProducts({
  categoryIds,
  lineIds,
  packagings,
  includeArchived,
  search,
  sort = "default",
}: {
  categoryIds?: ProductCategoryId[];
  lineIds?: ProductLineId[];
  packagings?: string[];
  includeArchived?: boolean;
  search?: string;
  sort?: "default" | "name-asc" | "name-desc" | "active-first" | "archived-first";
}) {
  const normalizedSearch = search?.trim().toLowerCase() ?? "";

  const filtered = products.filter((product) => {
    const matchesCategory =
      !categoryIds || categoryIds.length === 0
        ? true
        : categoryIds.includes(product.categoryId);

    const matchesLine =
      !lineIds || lineIds.length === 0
        ? true
        : lineIds.includes(product.lineId);

    const matchesPackaging =
      !packagings || packagings.length === 0
        ? true
        : product.packagings.some((item) => packagings.includes(item));

    const matchesArchived = includeArchived ? true : !product.isArchived;

    const haystack = [
      product.title,
      product.subtitle,
      product.description,
      getProductLineById(product.lineId)?.title,
      getProductCategoryById(product.categoryId)?.title,
      ...(product.characteristics?.map((item) => `${item.label} ${item.value}`) ?? []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch = normalizedSearch
      ? haystack.includes(normalizedSearch)
      : true;

    return (
      matchesCategory &&
      matchesLine &&
      matchesPackaging &&
      matchesArchived &&
      matchesSearch
    );
  });

  switch (sort) {
    case "name-asc":
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title, "ru"));
    case "name-desc":
      return [...filtered].sort((a, b) => b.title.localeCompare(a.title, "ru"));
    case "active-first":
      return [...filtered].sort(
        (a, b) => Number(!!a.isArchived) - Number(!!b.isArchived),
      );
    case "archived-first":
      return [...filtered].sort(
        (a, b) => Number(!!b.isArchived) - Number(!!a.isArchived),
      );
    default:
      return filtered;
  }
}
