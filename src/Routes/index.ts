export const routes = {
   main: "/",
   login: "/login",
   cards: "/cards",
   card: "/card/:id",
   cardId: (id: string|number) => `/card/${id}`,
} as const;
