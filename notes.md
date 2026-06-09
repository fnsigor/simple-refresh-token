estrutura de uma hash padrão do argon2:

`$argon2id$v=19$m=65536,t=2,p=1$/ILtU9ZQAPMGIkPyvgyZfg$TMPGXB0bSAWwLx8YIS3wz026xFujMGxC4B3kzAU9Pxo`

- $argon2id$v=19$m=65536,t=2,p=1$ - valores padrão de hash(). contem type, memoryCost, timeCost e parallelism

- restante da hash consiste num salt aleatório, pra previnir ataques rainbow table, e a hash da senha

- é importante os refresh tokens serem armazenados pra que possam serr revogados caso sejam comprometidos
