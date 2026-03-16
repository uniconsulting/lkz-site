import type { ReadonlyURLSearchParams } from "next/navigation";
import type { ProductCategoryId, ProductLineId } from "@/lib/content/products";

export type ProductsSortValue =
  | "default"
  | "name-asc"
  | "name-desc"
  | "active-first"
  | "archived-first";

export type ProductsFilterState = {
  search: string;
  categoryIds: ProductCategoryId[];
  lineIds: ProductLineId[];
  packagings: string[];
  applicationAreas: string[];
  includeArchived: boolean;
  sort: ProductsSortValue;
};

export const DEFAULT_PRODUCTS_FILTER_STATE: ProductsFilterState = {
  search: "",
  categoryIds: [],
  lineIds: [],
  packagings: [],
  applicationAreas: [],
  includeArchived: false,
  sort: "default",
};

function normalizeArrayParam(values: string[] | null | undefined) {
  if (!values || values.length === 0) return [];
  return Array.from(
    new Set(
      values
        .flatMap((value) => value.split(","))
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  );
}

function parseBooleanParam(value: string | null) {
  return value === "1" || value === "true";
}

export function parseFilterStateFromSearchParams(
  searchParams: ReadonlyURLSearchParams,
): ProductsFilterState {
  const search = searchParams.get("search")?.trim() ?? "";
  const categoryIds = normalizeArrayParam(searchParams.getAll("category")) as ProductCategoryId[];
  const lineIds = normalizeArrayParam(searchParams.getAll("line")) as ProductLineId[];
  const packagings = normalizeArrayParam(searchParams.getAll("pack"));
  const applicationAreas = normalizeArrayParam(searchParams.getAll("use"));
  const includeArchived = parseBooleanParam(searchParams.get("archived"));
  const sort = (searchParams.get("sort") as ProductsSortValue | null) ?? "default";

  return {
    search,
    categoryIds,
    lineIds,
    packagings,
    applicationAreas,
    includeArchived,
    sort,
  };
}

export function buildSearchParamsFromFilterState(state: ProductsFilterState) {
  const params = new URLSearchParams();

  if (state.search.trim()) {
    params.set("search", state.search.trim());
  }

  state.categoryIds.forEach((value) => {
    params.append("category", value);
  });

  state.lineIds.forEach((value) => {
    params.append("line", value);
  });

  state.packagings.forEach((value) => {
    params.append("pack", value);
  });

  state.applicationAreas.forEach((value) => {
    params.append("use", value);
  });

  if (state.includeArchived) {
    params.set("archived", "1");
  }

  if (state.sort !== "default") {
    params.set("sort", state.sort);
  }

  return params;
}

export function hasActiveProductsFilters(state: ProductsFilterState) {
  return (
    state.search.trim().length > 0 ||
    state.categoryIds.length > 0 ||
    state.lineIds.length > 0 ||
    state.packagings.length > 0 ||
    state.applicationAreas.length > 0 ||
    state.includeArchived ||
    state.sort !== "default"
  );
}
