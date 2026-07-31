export function categorySupportsItems(
  categoryName: string
) {
  return [
    "Compras",
    "Comida",
    "Hogar",
    "Mascotas",
    "Salud",
  ].includes(categoryName);
}