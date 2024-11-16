export default function groupCategoryItems(items) {
  const grouped = items.reduce((acc, item) => {
    const { category } = item;
    const existingCategory = acc.find((e) => e.category === category);
    if (existingCategory) {
      existingCategory.items.push(item);
      existingCategory.quantity += 1;
    } else {
      acc.push({ category, quantity: 1, items: [item] });
    }
    return acc;
  }, []);
  return grouped;
}
