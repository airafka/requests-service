/**
 * Список остаётся под якорем (инпутом): не поднимается над полем из‑за flip/preventOverflow у края вьюпорта.
 * При нехватке места снизу список может уйти за нижний край — пользователь прокручивает страницу.
 */
export const dropdownAnchoredPopperModifiers = [
  {
    name: "offset" as const,
    options: {
      offset: [0, 4] as [number, number],
    },
  },
  {
    name: "preventOverflow" as const,
    enabled: false,
  },
  {
    name: "flip" as const,
    enabled: false,
  },
];
