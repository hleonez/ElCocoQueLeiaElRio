"""Regenerar las fuentes WOFF2 sin cambiar familia, caracteres ni licencias.

Requiere fonttools y brotli. Ejecutar desde cualquier directorio.
"""
from pathlib import Path
from fontTools.ttLib import TTFont

root = Path(__file__).resolve().parents[1] / 'public' / 'fonts'
for path in sorted([*root.rglob('*.otf'), *root.rglob('*.ttf')]):
    with TTFont(path) as font:
        font.flavor = 'woff2'
        output = path.with_suffix('.woff2')
        font.save(output)
        print(f'{output.name}: {output.stat().st_size} bytes')
