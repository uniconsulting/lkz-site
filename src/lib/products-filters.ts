import type { ReadonlyURLSearchParams } from "next/navigation";
import type {
  ProductCategoryId,
  ProductLineId,
} from "@/lib/content/products";

export type ProductsSortValue = "default" | "name-asc" | "name-desc";

export type ProductsFilterState = {
  search: string;
  categoryIds: ProductCategoryId[];
  lineIds: ProductLineId[];
  workTypes: string[];
  materialTypes: string[];
  packagings: string[];
  applicationAreas: string[];
  sort: ProductsSortValue;
};

export const DEFAULT_PRODUCTS_FILTER_STATE: ProductsFilterState = {
  search: "",
  categoryIds: [],
  lineIds: [],
  workTypes: [],
  materialTypes: [],
  packagings: [],
  applicationAreas: [],
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

export function parseFilterStateFromSearchParams(
  searchParams: ReadonlyURLSearchParams,
): ProductsFilterState {
  const search = searchParams.get("search")?.trim() ?? "";
  const categoryIds = normalizeArrayParam(
    searchParams.getAll("category"),
  ) as ProductCategoryId[];
  const lineIds = normalizeArrayParam(
    searchParams.getAll("line"),
  ) as ProductLineId[];
  const workTypes = normalizeArrayParam(searchParams.getAll("work"));
  const materialTypes = normalizeArrayParam(searchParams.getAll("material"));
  const packagings = normalizeArrayParam(searchParams.getAll("pack"));
  const applicationAreas = normalizeArrayParam(searchParams.getAll("use"));
  const sort = (searchParams.get("sort") as ProductsSortValue | null) ?? "default";

  return {
    search,
    categoryIds,
    lineIds,
    workTypes,
    materialTypes,
    packagings,
    applicationAreas,
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

  state.workTypes.forEach((value) => {
    params.append("work", value);
  });

  state.materialTypes.forEach((value) => {
    params.append("material", value);
  });

  state.packagings.forEach((value) => {
    params.append("pack", value);
  });

  state.applicationAreas.forEach((value) => {
    params.append("use", value);
  });

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
    state.workTypes.length > 0 ||
    state.materialTypes.length > 0 ||
    state.packagings.length > 0 ||
    state.applicationAreas.length > 0 ||
    state.sort !== "default"
  );
}
