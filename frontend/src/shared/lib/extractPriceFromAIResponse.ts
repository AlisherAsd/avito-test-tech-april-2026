
export function extractPriceFromAIResponse(text: string): string | null {
  // Ищем первую цену в формате "число – число ₽"
  const priceMatch = text.match(/(\d[\d\s]*)\s*[–-]\s*(\d[\d\s]*)\s*₽/);
  
  if (priceMatch) {
    // Берём среднюю цену или максимальную
    const minPrice = parseInt(priceMatch[1].replace(/\s/g, ''), 10);
    const maxPrice = parseInt(priceMatch[2].replace(/\s/g, ''), 10);
    const averagePrice = Math.floor((minPrice + maxPrice) / 2);
    return averagePrice.toString();
  }
  
  return null;
}