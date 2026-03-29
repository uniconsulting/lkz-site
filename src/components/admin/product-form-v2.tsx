"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type {
  ProductCategory,
  ProductCategoryId,
  ProductItem,
  ProductLine,
  ProductLineId,
  ProductPackagingUnit,
} from "@/lib/content/products";
import type { ProductFormPayload } from "@/app/admin/products/actions";
import { AdminDropdown } from "@/components/admin/admin-dropdown";
import { AdminFilePlaceholder } from "@/components/admin/admin-file-placeholder";
import { AdminFormSection } from "@/components/admin/admin-form-section";
import { AdminImageUploadField } from "@/components/admin/admin-image-upload-field";
import {
  AdminRepeater,
  AdminRepeaterItem,
} from "@/components/admin/admin-repeater";
import { AdminSwitch } from "@/components/admin/admin-switch";
import { AdminTextInput } from "@/components/admin/admin-text-input";
import { AdminTextarea } from "@/components/admin/admin-textarea";

type CharacteristicRow = {
  label: string;
  value: string;
};

type PackagingRow = {
  label: string;
  value: string;
  unit: ProductPackagingUnit;
  sortOrder: string;
};

type DocumentRow = {
  title: string;
  kind: string;
};

function buildInitialCommercialCharacteristics(
  product?: ProductItem,
): CharacteristicRow[] {
  const items = product?.characteristics?.commercial ?? [];
  return items.length > 0 ? items : [{ label: "", value: "" }];
}

function buildInitialTechnicalCharacteristics(
  product?: ProductItem,
): CharacteristicRow[] {
  const items = product?.characteristics?.technical ?? [];
  return items.length > 0 ? items : [{ label: "", value: "" }];
}

function buildInitialApplicationAreas(product?: ProductItem): string[] {
  const items = product?.applicationAreas ?? [];
  return items.length > 0 ? items : [""];
}

function buildInitialPackagings(product?: ProductItem): PackagingRow[] {
  const items = product?.packagings ?? [];

  if (items.length === 0) {
    return [{ label: "", value: "", unit: "kg", sortOrder: "1" }];
  }

  return items.map((item) => ({
    label: item.label,
    value: String(item.value),
    unit: item.unit,
    sortOrder: String(item.sortOrder),
  }));
}

function buildInitialDocuments(product?: ProductItem): DocumentRow[] {
  const tags = product?.admin.tags ?? [];

  const supportedKinds = [
    "сертификат",
    "декларация",
    "сгр",
    "техлист",
    "инструкция",
  ];

  const guessedDocs = tags
    .filter((tag) => supportedKinds.includes(tag.toLowerCase()))
    .map((tag) => ({
      title: tag,
      kind: tag.toLowerCase(),
    }));

  return guessedDocs.length > 0
    ? guessedDocs
    : [{ title: "", kind: "сертификат" }];
}

export function ProductFormV2({
  mode,
  categories,
  lines,
  initialProduct,
  onSubmit,
}: {
  mode: "create" | "edit";
  categories: ProductCategory[];
  lines: ProductLine[];
  initialProduct?: ProductItem;
  onSubmit: (payload: ProductFormPayload) => Promise<void>;
}) {
  const [title, setTitle] = useState(initialProduct?.title ?? "");
  const [subtitle, setSubtitle] = useState(initialProduct?.subtitle ?? "");
  const [slug, setSlug] = useState(initialProduct?.slug ?? "");
  const [categoryId, setCategoryId] = useState<ProductCategoryId>(
    initialProduct?.categoryId ?? categories[0]?.id ?? "paints",
  );
  const [lineId, setLineId] = useState<ProductLineId>(
    initialProduct?.lineId ?? lines[0]?.id ?? "emalyer",
  );
  const [description, setDescription] = useState(
    initialProduct?.description ?? "",
  );
  const [sortOrder, setSortOrder] = useState(
    String(initialProduct?.admin.sortOrder ?? 100),
  );
  const [isPublished, setIsPublished] = useState(
    initialProduct?.admin.isPublished ?? true,
  );

  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(
    initialProduct?.images?.preview ?? null,
  );
  const [detailImageUrl, setDetailImageUrl] = useState<string | null>(
    initialProduct?.images?.detail ?? null,
  );
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [applicationAreas, setApplicationAreas] = useState<string[]>(
    buildInitialApplicationAreas(initialProduct),
  );
  const [packagings, setPackagings] = useState<PackagingRow[]>(
    buildInitialPackagings(initialProduct),
  );
  const [documents, setDocuments] = useState<DocumentRow[]>(
    buildInitialDocuments(initialProduct),
  );
  const [commercialCharacteristics, setCommercialCharacteristics] = useState<
    CharacteristicRow[]
  >(buildInitialCommercialCharacteristics(initialProduct));
  const [technicalCharacteristics, setTechnicalCharacteristics] = useState<
    CharacteristicRow[]
  >(buildInitialTechnicalCharacteristics(initialProduct));

  const categoryOptions = useMemo(
    () => categories.map((item) => ({ value: item.id, label: item.title })),
    [categories],
  );

  const lineOptions = useMemo(
    () => lines.map((item) => ({ value: item.id, label: item.title })),
    [lines],
  );

  const documentKindOptions = [
    { value: "сертификат", label: "Сертификат" },
    { value: "декларация", label: "Декларация" },
    { value: "сгр", label: "СГР" },
    { value: "техлист", label: "Технический лист" },
    { value: "инструкция", label: "Инструкция" },
    { value: "другое", label: "Другое" },
  ];

  const packagingUnitOptions = [
    { value: "kg", label: "кг" },
    { value: "l", label: "л" },
  ];

  const isValid = useMemo(() => {
    return Boolean(
      title.trim() &&
        slug.trim() &&
        categoryId.trim() &&
        lineId.trim() &&
        description.trim(),
    );
  }, [title, slug, categoryId, lineId, description]);

  function handleSubmit() {
    const payload: ProductFormPayload = {
      id: initialProduct?.id,
      title,
      subtitle,
      slug,
      categoryId,
      lineId,
      description,
      sortOrder,
      isPublished,
      applicationAreas,
      packagings,
      documents,
      commercialCharacteristics,
      technicalCharacteristics,
      previewImageUrl: previewImageUrl ?? undefined,
      detailImageUrl: detailImageUrl ?? undefined,
    };

    startTransition(async () => {
      await onSubmit(payload);
    });
  }

  function updateApplicationArea(index: number, value: string) {
    setApplicationAreas((prev) =>
      prev.map((item, itemIndex) => (itemIndex === index ? value : item)),
    );
  }

  function removeApplicationArea(index: number) {
    setApplicationAreas((prev) =>
      prev.length === 1
        ? prev
        : prev.filter((_, itemIndex) => itemIndex !== index),
    );
  }

  function updatePackaging<K extends keyof PackagingRow>(
    index: number,
    key: K,
    value: PackagingRow[K],
  ) {
    setPackagings((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item,
      ),
    );
  }

  function removePackaging(index: number) {
    setPackagings((prev) =>
      prev.length === 1
        ? prev
        : prev.filter((_, itemIndex) => itemIndex !== index),
    );
  }

  function updateDocument<K extends keyof DocumentRow>(
    index: number,
    key: K,
    value: DocumentRow[K],
  ) {
    setDocuments((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item,
      ),
    );
  }

  function removeDocument(index: number) {
    setDocuments((prev) =>
      prev.length === 1
        ? prev
        : prev.filter((_, itemIndex) => itemIndex !== index),
    );
  }

  function updateCharacteristic(
    setter: React.Dispatch<React.SetStateAction<CharacteristicRow[]>>,
    index: number,
    key: keyof CharacteristicRow,
    value: string,
  ) {
    setter((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item,
      ),
    );
  }

  function removeCharacteristic(
    setter: React.Dispatch<React.SetStateAction<CharacteristicRow[]>>,
    index: number,
  ) {
    setter((prev) =>
      prev.length === 1
        ? prev
        : prev.filter((_, itemIndex) => itemIndex !== index),
    );
  }

  return (
    <form className="space-y-6">
      <AdminFormSection
        eyebrow="основное"
        title="Основные данные"
        description="Базовая информация карточки товара, которая влияет на каталог и страницу продукта."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <AdminTextInput
            label="Название"
            value={title}
            onChange={setTitle}
            placeholder="Например: Краска фасадная"
          />

          <AdminTextInput
            label="Подзаголовок"
            value={subtitle}
            onChange={setSubtitle}
            placeholder="Например: акриловая"
          />

          <AdminTextInput
            label="Slug"
            value={slug}
            onChange={setSlug}
            placeholder="facade-paint-white"
          />

          <AdminTextInput
            label="Порядок сортировки"
            type="number"
            value={sortOrder}
            onChange={setSortOrder}
            placeholder="100"
          />

          <div>
            <div className="mb-2 text-[13px] font-medium text-[var(--color-text-muted)]">
              Категория
            </div>
            <AdminDropdown
              value={categoryId}
              onChange={(value) => setCategoryId(value as ProductCategoryId)}
              options={categoryOptions}
            />
          </div>

          <div>
            <div className="mb-2 text-[13px] font-medium text-[var(--color-text-muted)]">
              Линейка
            </div>
            <AdminDropdown
              value={lineId}
              onChange={(value) => setLineId(value as ProductLineId)}
              options={lineOptions}
            />
          </div>
        </div>

        <div className="mt-4">
          <AdminTextarea
            label="Описание"
            value={description}
            onChange={setDescription}
            placeholder="Краткое описание товара"
          />
        </div>

        <div className="mt-5">
          <AdminSwitch
            checked={isPublished}
            onChange={setIsPublished}
            label="Опубликовать товар"
            description="Если выключено, товар останется в статусе черновика."
          />
        </div>
      </AdminFormSection>

      <AdminFormSection
        eyebrow="изображения"
        title="Изображения товара"
        description="Отдельно загружаются изображение каталога и изображение расширенной карточки."
      >
        <div className="grid gap-4 xl:grid-cols-2">
          <AdminImageUploadField
            title="Preview image"
            description={"изображение для карточки\nтовара в каталоге"}
            initialImageUrl={initialProduct?.images?.preview}
            onUploadComplete={setPreviewImageUrl}
          />

          <AdminImageUploadField
            title="Detail image"
            description={"основное изображение для\nрасширенной страницы товара"}
            initialImageUrl={initialProduct?.images?.detail}
            onUploadComplete={setDetailImageUrl}
          />
        </div>

        {(previewImageUrl || detailImageUrl) ? (
          <div className="mt-4 text-[12px] text-[var(--color-text-muted)]">
            Изображения загружены и будут сохранены при создании/обновлении товара.
          </div>
        ) : null}
      </AdminFormSection>

      <AdminFormSection
        eyebrow="документация"
        title="Документация по продукту"
        description="Сюда добавляются сертификаты, декларации, СГР, технические листы и другая документация."
      >
        <AdminRepeater
          title="Список документов"
          description="Для каждого документа задаются название, тип и файл."
          addLabel="добавить документ"
          onAdd={() =>
            setDocuments((prev) => [...prev, { title: "", kind: "сертификат" }])
          }
        >
          {documents.map((item, index) => (
            <AdminRepeaterItem
              key={`document-${index}`}
              onRemove={() => removeDocument(index)}
            >
              <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_240px]">
                <AdminTextInput
                  label="Название документа"
                  value={item.title}
                  onChange={(value) => updateDocument(index, "title", value)}
                  placeholder="Например: Сертификат соответствия"
                />

                <div>
                  <div className="mb-2 text-[13px] font-medium text-[var(--color-text-muted)]">
                    Тип документа
                  </div>
                  <AdminDropdown
                    value={item.kind}
                    onChange={(value) => updateDocument(index, "kind", value)}
                    options={documentKindOptions}
                  />
                </div>
              </div>

              <div className="mt-4">
                <AdminFilePlaceholder
                  title="Файл документа"
                  description="прикрепите документ к карточке товара"
                  kind="document"
                />
              </div>
            </AdminRepeaterItem>
          ))}
        </AdminRepeater>
      </AdminFormSection>

      <AdminFormSection
        eyebrow="подходит для задач"
        title="Сценарии и задачи"
        description="Эти значения используются в блоке «подходит для задач» и в сценариях применения на странице товара."
      >
        <AdminRepeater
          title="Список задач"
          addLabel="добавить задачу"
          onAdd={() => setApplicationAreas((prev) => [...prev, ""])}
        >
          {applicationAreas.map((item, index) => (
            <AdminRepeaterItem
              key={`application-${index}`}
              onRemove={() => removeApplicationArea(index)}
            >
              <AdminTextInput
                label={`Задача ${index + 1}`}
                value={item}
                onChange={(value) => updateApplicationArea(index, value)}
                placeholder="Например: фасад, стены, дерево, радиаторы"
              />
            </AdminRepeaterItem>
          ))}
        </AdminRepeater>
      </AdminFormSection>

      <AdminFormSection
        eyebrow="фасовки"
        title="Доступные фасовки"
        description="Фасовки выводятся в карточке товара и участвуют в фильтрации каталога."
      >
        <AdminRepeater
          title="Список фасовок"
          addLabel="добавить фасовку"
          onAdd={() =>
            setPackagings((prev) => [
              ...prev,
              {
                label: "",
                value: "",
                unit: "kg",
                sortOrder: `${prev.length + 1}`,
              },
            ])
          }
        >
          {packagings.map((item, index) => (
            <AdminRepeaterItem
              key={`packaging-${index}`}
              onRemove={() => removePackaging(index)}
            >
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <AdminTextInput
                  label="Label"
                  value={item.label}
                  onChange={(value) => updatePackaging(index, "label", value)}
                  placeholder="14 кг"
                />

                <AdminTextInput
                  label="Значение"
                  type="number"
                  value={item.value}
                  onChange={(value) => updatePackaging(index, "value", value)}
                  placeholder="14"
                />

                <div>
                  <div className="mb-2 text-[13px] font-medium text-[var(--color-text-muted)]">
                    Единица
                  </div>
                  <AdminDropdown
                    value={item.unit}
                    onChange={(value) =>
                      updatePackaging(index, "unit", value as ProductPackagingUnit)
                    }
                    options={packagingUnitOptions}
                  />
                </div>

                <AdminTextInput
                  label="Порядок"
                  type="number"
                  value={item.sortOrder}
                  onChange={(value) => updatePackaging(index, "sortOrder", value)}
                  placeholder="1"
                />
              </div>
            </AdminRepeaterItem>
          ))}
        </AdminRepeater>
      </AdminFormSection>

      <AdminFormSection
        eyebrow="параметры"
        title="Коммерческие параметры"
        description="Эти данные выводятся в блоке коммерческой информации."
      >
        <AdminRepeater
          title="Коммерческие характеристики"
          addLabel="добавить параметр"
          onAdd={() =>
            setCommercialCharacteristics((prev) => [
              ...prev,
              { label: "", value: "" },
            ])
          }
        >
          {commercialCharacteristics.map((item, index) => (
            <AdminRepeaterItem
              key={`commercial-${index}`}
              onRemove={() =>
                removeCharacteristic(setCommercialCharacteristics, index)
              }
            >
              <div className="grid gap-4 md:grid-cols-2">
                <AdminTextInput
                  label="Название"
                  value={item.label}
                  onChange={(value) =>
                    updateCharacteristic(
                      setCommercialCharacteristics,
                      index,
                      "label",
                      value,
                    )
                  }
                  placeholder="Например: Категория"
                />

                <AdminTextInput
                  label="Значение"
                  value={item.value}
                  onChange={(value) =>
                    updateCharacteristic(
                      setCommercialCharacteristics,
                      index,
                      "value",
                      value,
                    )
                  }
                  placeholder="Например: Краски"
                />
              </div>
            </AdminRepeaterItem>
          ))}
        </AdminRepeater>
      </AdminFormSection>

      <AdminFormSection
        eyebrow="свойства"
        title="Технические свойства"
        description="Сюда добавляются основа, тип, назначение и другие технические свойства."
      >
        <AdminRepeater
          title="Технические характеристики"
          addLabel="добавить свойство"
          onAdd={() =>
            setTechnicalCharacteristics((prev) => [
              ...prev,
              { label: "", value: "" },
            ])
          }
        >
          {technicalCharacteristics.map((item, index) => (
            <AdminRepeaterItem
              key={`technical-${index}`}
              onRemove={() =>
                removeCharacteristic(setTechnicalCharacteristics, index)
              }
            >
              <div className="grid gap-4 md:grid-cols-2">
                <AdminTextInput
                  label="Название"
                  value={item.label}
                  onChange={(value) =>
                    updateCharacteristic(
                      setTechnicalCharacteristics,
                      index,
                      "label",
                      value,
                    )
                  }
                  placeholder="Например: Основа"
                />

                <AdminTextInput
                  label="Значение"
                  value={item.value}
                  onChange={(value) =>
                    updateCharacteristic(
                      setTechnicalCharacteristics,
                      index,
                      "value",
                      value,
                    )
                  }
                  placeholder="Например: Акриловая"
                />
              </div>
            </AdminRepeaterItem>
          ))}
        </AdminRepeater>
      </AdminFormSection>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={!isValid || isPending}
          onClick={handleSubmit}
          className="inline-flex h-12 items-center justify-center rounded-[18px] bg-[var(--color-accent-1)] px-6 text-[14px] font-semibold text-[var(--color-accent-1-foreground)] transition duration-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending
            ? "сохранение..."
            : mode === "create"
              ? "создать товар"
              : "сохранить изменения"}
        </button>

        <button
          type="button"
          disabled={isPending}
          onClick={() => router.back()}
          className="inline-flex h-12 items-center justify-center rounded-[18px] bg-[var(--color-surface)] px-6 text-[14px] font-semibold text-[var(--color-text)] transition duration-300 disabled:opacity-50"
        >
          отмена
        </button>
      </div>
    </form>
  );
}
