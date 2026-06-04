export const USERS = new Map([
  [
    "email@dominio.com",
    {
      id: "01",
      name: "fulana de tal",
      createdAt: "2026-06-04",
      email: "email@dominio.com",
      password:
        "$argon2id$v=19$m=65536,t=3,p=4$wi220pcASwuUYG+2MtCuxA$DNiSq1frRQ7FVzK1lM60wC3SNXDNkRCUKwZgrsaPAaQ",
      unhashedPassword: "senha123",
    },
  ],

  [
    "email2@dominio.com",
    {
      id: "02",
      name: "iguinho rei delas",
      createdAt: "2026-06-02",
      email: "email2@dominio.com",
      password:
        "$argon2id$v=19$m=65536,t=3,p=4$H0IULTxKmvfCGV0PJ5njrA$sQ1y4cA9D2JhbiHkrV5bsKKrPM/lQWk4qbkNR83TzQ4",
      unhashedPassword: "password",
    },
  ],
]);
