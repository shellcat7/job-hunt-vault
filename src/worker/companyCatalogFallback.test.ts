import { describe, expect, it } from "vitest";
import { fallbackCompanyCatalogCount, searchFallbackCompanyCatalog } from "./companyCatalogFallback";

describe("fallback company catalog", () => {
  it("matches common aliases such as Tokyo Metro", () => {
    const [company] = searchFallbackCompanyCatalog("東京メトロ", null, null);

    expect(company?.name).toBe("東京地下鉄株式会社");
    expect(company?.ticker).toBe("9023");
  });

  it("matches reading input across hiragana and katakana", () => {
    const hiraganaMatches = searchFallbackCompanyCatalog("みつびし", null, null);
    const katakanaMatches = searchFallbackCompanyCatalog("ミツビシ", null, null);

    expect(hiraganaMatches.some((company) => company.ticker === "7011")).toBe(true);
    expect(katakanaMatches.some((company) => company.ticker === "7011")).toBe(true);
  });

  it("keeps the documented built-in catalog count in sync", () => {
    expect(fallbackCompanyCatalogCount).toBe(117);
  });
});
