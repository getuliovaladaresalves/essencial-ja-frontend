# Instruções para Gerar Favicon

## Favicon SVG (já criado)
- Arquivo: `/public/favicon.svg`
- Design: Logo oficial do Essencial Já
- Cores: Azul Índigo (#4f46e5) com ícone branco

## Favicon PNG (precisa ser gerado)
Para gerar o favicon PNG, use uma das seguintes opções:

### Opção 1: Online
1. Acesse https://favicon.io/favicon-generator/
2. Faça upload do arquivo `favicon.svg`
3. Baixe o pacote de favicons
4. Substitua os arquivos em `/public/`

### Opção 2: Usando Node.js
```bash
npm install -g favicon-generator
favicon-generator favicon.svg
```

### Opção 3: Usando Python
```python
from PIL import Image
import os

# Carregar SVG e converter para PNG
# (código Python para conversão)
```

## Arquivos necessários:
- favicon.ico (16x16, 32x32, 48x48)
- favicon.png (32x32)
- apple-touch-icon.png (180x180)
- android-chrome-192x192.png
- android-chrome-512x512.png
