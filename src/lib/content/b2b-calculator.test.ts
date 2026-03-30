import { describe, it, expect } from "vitest";
import {
  calculateScores,
  resolveCalculatorResult,
  mapResultToCards,
  type CalculatorAnswers,
} from "./b2b-calculator";

const FULL_ANSWERS: CalculatorAnswers = {
  profile: "dealer",
  format: "ready_products",
  volume: "small",
  geography: "local",
  priority: "margin",
};

describe("calculateScores", () => {
  it("возвращает нулевые очки при пустых ответах", () => {
    const scores = calculateScores({});
    expect(scores.models.dealer_model).toBe(0);
    expect(scores.accents.margin).toBe(0);
  });

  it("накапливает очки модели при выборе профиля dealer", () => {
    const scores = calculateScores({ profile: "dealer" });
    // dealer → dealer_model: 3, ready_matrix: 1, margin: 1
    expect(scores.models.dealer_model).toBe(3);
    expect(scores.models.ready_matrix).toBe(1);
    expect(scores.accents.margin).toBe(1);
  });

  it("накапливает очки из нескольких шагов", () => {
    const scores = calculateScores({
      profile: "dealer",   // dealer_model: 3, ready_matrix: 1, margin: 1
      format: "ready_products", // ready_matrix: 4, dealer_model: 1, stability: 1
    });
    expect(scores.models.dealer_model).toBe(4); // 3 + 1
    expect(scores.models.ready_matrix).toBe(5); // 1 + 4
    expect(scores.accents.margin).toBe(1);
    expect(scores.accents.stability).toBe(1);
  });

  it("игнорирует неизвестные значения ответов", () => {
    const scores = calculateScores({ profile: "unknown_value" as any });
    expect(scores.models.dealer_model).toBe(0);
  });
});

describe("resolveCalculatorResult", () => {
  it("возвращает null при неполных ответах", () => {
    expect(resolveCalculatorResult({})).toBeNull();
    expect(resolveCalculatorResult({ profile: "dealer" })).toBeNull();
    expect(
      resolveCalculatorResult({
        profile: "dealer",
        format: "ready_products",
        volume: "small",
        geography: "local",
        // priority отсутствует
      }),
    ).toBeNull();
  });

  it("возвращает результат при полных ответах", () => {
    const result = resolveCalculatorResult(FULL_ANSWERS);
    expect(result).not.toBeNull();
    expect(result!.model).toBeDefined();
    expect(result!.modelTitle).toBeTruthy();
    expect(result!.accentTitle).toBeTruthy();
  });

  it("dealer + ready_products + small + margin попадает в сценарий override", () => {
    // scenarioOverride: profile=dealer, format=ready_products, volume=small, priority=margin
    const result = resolveCalculatorResult(FULL_ANSWERS);
    expect(result!.model).toBe("dealer_model");
    expect(result!.modelTitle).toBe("Дилерская модель");
    expect(result!.startTitle).toBe("Базовая матрица для входа");
  });

  it("retail_chain + private_label + medium + stm попадает в override", () => {
    const answers: CalculatorAnswers = {
      profile: "retail_chain",
      format: "private_label",
      volume: "medium",
      geography: "region",
      priority: "stm",
    };
    const result = resolveCalculatorResult(answers);
    expect(result!.model).toBe("private_label_model");
    expect(result!.startTitle).toBe("Запуск ограниченной линейки СТМ");
  });

  it("distributor + multi_region + logistics попадает в override", () => {
    const answers: CalculatorAnswers = {
      profile: "distributor",
      format: "hybrid",
      volume: "large",
      geography: "multi_region",
      priority: "logistics",
    };
    const result = resolveCalculatorResult(answers);
    expect(result!.model).toBe("hybrid_model");
    expect(result!.startTitle).toBe("Региональный запуск с масштабированием");
  });

  it("private_label формат ведёт к модели private_label_model без override", () => {
    const answers: CalculatorAnswers = {
      profile: "online_b2b",
      format: "private_label",
      volume: "test",
      geography: "federal",
      priority: "stm",
    };
    const result = resolveCalculatorResult(answers);
    expect(result!.model).toBe("private_label_model");
  });
});

describe("mapResultToCards", () => {
  it("возвращает массив из 4 карточек с нужными id", () => {
    const result = resolveCalculatorResult(FULL_ANSWERS)!;
    const cards = mapResultToCards(result);
    expect(cards).toHaveLength(4);
    const ids = cards.map((c) => c.id);
    expect(ids).toEqual(["model", "start", "accent", "next-step"]);
  });

  it("каждая карточка содержит непустые title, value, description", () => {
    const result = resolveCalculatorResult(FULL_ANSWERS)!;
    const cards = mapResultToCards(result);
    cards.forEach((card) => {
      expect(card.title).toBeTruthy();
      expect(card.value).toBeTruthy();
      expect(card.description).toBeTruthy();
    });
  });
});
