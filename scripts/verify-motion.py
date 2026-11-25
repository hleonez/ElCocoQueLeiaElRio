"""Comprobaciones de navegador para el recorrido actual del río.

Requiere Playwright de Python y Edge. Ejecutar sobre una compilación servida:
python scripts/verify-motion.py --url http://localhost:4321
"""
import argparse
from playwright.sync_api import sync_playwright, expect

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--url', default='http://localhost:4321')
args = parser.parse_args()

with sync_playwright() as p:
    browser = p.chromium.launch(channel='msedge', headless=True)
    context = browser.new_context(viewport={'width': 1440, 'height': 960}, reduced_motion='no-preference')
    page = context.new_page()
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    assert page.goto(args.url, wait_until='networkidle').status == 200
    assert page.locator('h1').count() == 1
    assert page.locator('main > section').evaluate_all('(els) => els.map(el => el.id)') == ['inicio', 'drilo', 'historia', 'proposito', 'autora', 'libro']
    assert page.locator('a[href^="#"]').evaluate_all('(els) => els.every(a => document.getElementById(a.hash.slice(1)))')
    assert page.locator('[data-motion-control], [data-title-trigger], .draft-note').count() == 0

    toggle = page.get_by_role('button', name='Apartar los juncos', exact=True)
    toggle.focus()
    page.keyboard.press('Enter')
    expect(toggle).to_have_attribute('aria-pressed', 'true')
    expect(page.locator('[data-signal-caption]')).to_have_text('La señal ya se ve. Entenderla sigue siendo un reto para Drilo.')
    page.keyboard.press('Enter')
    expect(toggle).to_have_attribute('aria-pressed', 'false')

    # La escena avanza y se puede recorrer hacia atrás sin bloquear el scroll.
    for key in ['signals', 'small', 'listening', 'small', 'signals']:
        step = page.locator(f'[data-passage-step="{key}"]')
        y = step.evaluate('(el) => el.getBoundingClientRect().top + scrollY + el.offsetHeight / 2 - innerHeight / 2')
        page.evaluate('(y) => scrollTo({top:y, behavior:"instant"})', y)
        expect(page.locator('[data-passage]')).to_have_attribute('data-phase', key)
    assert page.locator('.passage-visual').evaluate('(el) => getComputedStyle(el).position') == 'sticky'

    for width, height in [(320, 740), (390, 844), (768, 1024), (1440, 960)]:
        page.set_viewport_size({'width': width, 'height': height})
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), width
        assert page.locator('.passage-step').evaluate_all('(els) => els.every(el => getComputedStyle(el).opacity === "1")')

    page.emulate_media(reduced_motion='reduce')
    assert page.locator('html').evaluate('(el) => getComputedStyle(el).scrollBehavior') == 'auto'
    assert page.locator('.passage-visual').evaluate('(el) => getComputedStyle(el).position') == 'relative'
    assert page.evaluate('document.getAnimations().length') == 0
    page.emulate_media(reduced_motion='no-preference')

    page.goto(args.url, wait_until='networkidle')
    page.keyboard.press('Tab')
    expect(page.locator('.skip-link')).to_be_focused()
    page.keyboard.press('Enter')
    expect(page.locator('main')).to_be_focused()
    expect(page.get_by_role('link', name='Consultar en ITA', exact=True)).to_have_attribute('href', 'https://itabooks.com/producto/el-coco-que-leia-en-el-rio/')
    expect(page.locator('.author-links a')).to_have_attribute('href', 'https://www.instagram.com/millunaress__/')

    static = browser.new_context(java_script_enabled=False, reduced_motion='reduce').new_page()
    static.goto(args.url, wait_until='networkidle')
    assert static.locator('h1').count() == 1
    assert static.locator('.passage-step').count() == 3
    assert static.locator('[data-reeds-toggle]').is_hidden()
    assert static.locator('.grandmother-quote').is_visible()
    assert not errors, errors
    browser.close()
    print('Recorrido verificado: navegación, señales, reversión, movimiento reducido, lectura estática y adaptación.')
