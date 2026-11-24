"""Browser regression checks. Requires Python Playwright and an installed Edge.

Run against a built site: python scripts/verify-motion.py --url http://localhost:4324
"""
import argparse
import json
from pathlib import Path

from playwright.sync_api import expect, sync_playwright

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--url', default='http://localhost:4324')
parser.add_argument('--channel', default='msedge')
parser.add_argument('--screenshots', type=Path, default=Path('.qa/fase5'))
args = parser.parse_args()
args.screenshots.mkdir(parents=True, exist_ok=True)
TITLE = 'El coco que leía el río'
ACTIVE_LETTERS = "() => [...document.querySelectorAll('.animated-title__letter')].reduce((n, el) => n + el.getAnimations().length, 0)"


def scroll(page, y):
    page.evaluate('(y) => scrollTo({top: y, behavior: "instant"})', y)
    # Wait for style and animation timelines to reflect the new scroll position.
    page.evaluate('() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))')


def top(page, selector):
    return page.locator(selector).first.evaluate('(el) => el.getBoundingClientRect().top + scrollY')


def style(page, selector, prop, pseudo=None):
    return page.locator(selector).first.evaluate(
        '(el, a) => getComputedStyle(el, a.pseudo).getPropertyValue(a.prop)',
        {'prop': prop, 'pseudo': pseudo},
    )


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(channel=args.channel, headless=True)
    context = browser.new_context(viewport={'width': 1440, 'height': 960}, reduced_motion='no-preference')
    context.add_init_script('''
      window.motionInputListeners = [];
      const add = EventTarget.prototype.addEventListener;
      EventTarget.prototype.addEventListener = function(type, ...rest) {
        if (['scroll', 'wheel', 'touchmove'].includes(type)) window.motionInputListeners.push(type);
        return add.call(this, type, ...rest);
      };
    ''')
    page = context.new_page()
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    assert page.goto(args.url, wait_until='networkidle').status == 200
    title = page.get_by_role('heading', level=1, name=TITLE, exact=True)
    assert title.count() == 1
    assert title.text_content() == TITLE  # Selection/copy includes correct spaces and accents.
    assert page.locator('meta[name="robots"]').get_attribute('content') == 'noindex'
    assert page.locator('main > section').evaluate_all('(els) => els.map(el => el.id)') == ['inicio', 'drilo', 'historia', 'proposito', 'autora', 'libro']
    assert page.locator('a[href^="#"]').evaluate_all('(els) => els.every(el => document.getElementById(el.hash.slice(1)))')

    # A wave starts on keyboard activation, restores itself, and causes no reflow.
    trigger = page.get_by_role('button', name='Animar el título', exact=True)
    assert page.locator('[data-motion-control], .draft-note').count() == 0
    assert page.locator('html').get_attribute('data-motion') == 'on'
    expect(trigger).to_be_enabled()
    layout = page.locator('.byline').bounding_box()
    trigger.focus()
    page.keyboard.press('Enter')
    page.wait_for_function(f'({ACTIVE_LETTERS})() > 0')
    assert page.locator('.byline').bounding_box() == layout
    title.screenshot(path=str(args.screenshots / 'fase5-titulo.png'))
    page.wait_for_function(f'({ACTIVE_LETTERS})() === 0')
    assert title.text_content() == TITLE
    assert style(page, '.animated-title__letter', 'transform') == 'none'
    # Pointer exit cancels immediately; staying over it never starts a loop.
    title.hover()
    page.wait_for_function(f'({ACTIVE_LETTERS})() > 0')
    page.mouse.move(1, 1)
    assert page.evaluate(ACTIVE_LETTERS) == 0
    title.hover()
    page.wait_for_function(f'({ACTIVE_LETTERS})() > 0')
    page.wait_for_function(f'({ACTIVE_LETTERS})() === 0')
    page.wait_for_timeout(100)
    assert page.evaluate(ACTIVE_LETTERS) == 0
    page.mouse.move(1, 1)

    # Timelines advance and reverse with native scrolling.
    scroll(page, 0)
    initial = [style(page, selector, 'transform') for selector in ['.animated-title__word', '.hero-cover', '.river-scene__bank', '.journey-progress']]
    scroll(page, 320)
    later = [style(page, selector, 'transform') for selector in ['.animated-title__word', '.hero-cover', '.river-scene__bank', '.journey-progress']]
    assert all(a != b for a, b in zip(initial, later)), (initial, later)
    scroll(page, 0)
    assert initial == [style(page, selector, 'transform') for selector in ['.animated-title__word', '.hero-cover', '.river-scene__bank', '.journey-progress']]
    story_top = top(page, '.story-layout')
    scroll(page, story_top - 100)
    leaf_start = style(page, '.river-journey__leaf', 'offset-distance')
    trail_start = style(page, '.river-journey__trail', 'stroke-dashoffset')
    assert style(page, '.river-journey', 'position') == 'sticky'
    scroll(page, story_top + 260)
    leaf_end = style(page, '.river-journey__leaf', 'offset-distance')
    assert leaf_start != leaf_end
    assert trail_start != style(page, '.river-journey__trail', 'stroke-dashoffset')
    page.screenshot(path=str(args.screenshots / 'fase5-historia.jpg'), type='jpeg', quality=85)
    scroll(page, story_top - 100)
    assert style(page, '.river-journey__leaf', 'offset-distance') == leaf_start
    moment_top = top(page, '.story-moment')
    scroll(page, moment_top - 800)
    moment_start = style(page, '.story-moment', 'transform', '::after')
    scroll(page, moment_top + 150)
    assert moment_start != style(page, '.story-moment', 'transform', '::after')
    cover_top = top(page, '.purchase-cover')
    scroll(page, cover_top - 960)
    cover_start = style(page, '.purchase-cover', 'transform')
    scroll(page, cover_top - 400)
    assert cover_start != style(page, '.purchase-cover', 'transform')
    assert page.locator('h2, h3, .section-copy > p, .story-moment > p, .conversation li, .edition-facts').evaluate_all('(els) => els.every(el => el.getAnimations().length === 0)')
    assert page.evaluate('window.motionInputListeners') == []

    # System preference changes cancel a running wave without manual controls.
    scroll(page, 0)
    trigger.focus()
    page.keyboard.press('Enter')
    page.wait_for_function(f'({ACTIVE_LETTERS})() > 0')
    page.emulate_media(reduced_motion='reduce')
    expect(trigger).to_be_disabled()
    assert page.evaluate(ACTIVE_LETTERS) == 0
    assert page.evaluate('document.getAnimations().length') == 0
    assert style(page, '.river-journey', 'position') == 'relative'
    assert style(page, 'html', 'scroll-behavior') == 'auto'
    page.emulate_media(reduced_motion='no-preference')
    expect(trigger).to_be_enabled()

    # A stored choice from the retired controls must not disable default motion.
    page.evaluate("localStorage.setItem('drilo-motion', 'off')")
    page.reload(wait_until='networkidle')
    expect(trigger).to_be_enabled()
    assert page.locator('html').get_attribute('data-motion') == 'on'
    page.evaluate("localStorage.removeItem('drilo-motion')")

    page.goto(args.url, wait_until='networkidle')
    page.keyboard.press('Tab')
    expect(page.locator('.skip-link')).to_be_focused()
    page.keyboard.press('Enter')
    expect(page.locator('main')).to_be_focused()
    page.get_by_role('link', name='Encuentra el libro', exact=True).click()
    expect(page).to_have_url(args.url.rstrip('/') + '/#libro')
    expect(page.locator('.purchase-links a')).to_have_attribute('href', 'https://itabooks.com/producto/el-coco-que-leia-en-el-rio/')

    # Responsive composition and the mobile river's own timeline.
    for width, height in [(320, 740), (390, 844), (768, 1024), (1024, 600), (1440, 960)]:
        page.set_viewport_size({'width': width, 'height': height})
        page.goto(args.url, wait_until='networkidle')
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), width
        if width < 1024 or height < 672:
            assert style(page, '.river-journey', 'position') == 'relative'
        if width == 390:
            river_top = top(page, '.river-journey')
            scroll(page, river_top - 740)
            mobile_leaf = style(page, '.river-journey__leaf', 'offset-distance')
            scroll(page, river_top - 180)
            assert mobile_leaf != style(page, '.river-journey__leaf', 'offset-distance')
            page.screenshot(path=str(args.screenshots / 'fase5-movil-rio.jpg'), type='jpeg', quality=85)
        if width in [390, 1440]:
            scroll(page, 0)
            name = 'movil' if width == 390 else 'escritorio'
            page.screenshot(path=str(args.screenshots / f'fase5-{name}.jpg'), type='jpeg', quality=85)

    # Touch uses the same native title button; storage is not required.
    touch_context = browser.new_context(has_touch=True, is_mobile=True, viewport={'width': 390, 'height': 844})
    touch_context.add_init_script('''
      Storage.prototype.getItem = Storage.prototype.setItem = () => { throw new DOMException('Blocked', 'SecurityError'); };
    ''')
    touch = touch_context.new_page()
    touch.on('pageerror', lambda error: errors.append(str(error)))
    touch.goto(args.url, wait_until='networkidle')
    touch.get_by_role('button', name='Animar el título', exact=True).tap()
    touch.wait_for_function(f'({ACTIVE_LETTERS})() > 0')
    touch.wait_for_function(f'({ACTIVE_LETTERS})() === 0')
    expect(touch.get_by_role('button', name='Animar el título', exact=True)).to_be_enabled()

    static = browser.new_context(java_script_enabled=False, reduced_motion='reduce').new_page()
    static.goto(args.url, wait_until='networkidle')
    assert static.get_by_role('heading', level=1, name=TITLE, exact=True).text_content() == TITLE
    assert static.locator('.story-moment').count() == 3
    assert static.locator('[data-title-tools]:visible, [data-motion-control]:visible').count() == 0
    static.get_by_role('link', name='Encuentra el libro', exact=True).click()
    expect(static).to_have_url(args.url.rstrip('/') + '/#libro')
    assert not errors, errors
    print(json.dumps({'ok': True, 'widths': [320, 390, 768, 1024, 1440], 'story_leaf': [leaf_start, leaf_end], 'checks': ['title: keyboard, pointer, touch, no reflow, cleanup', 'native scroll: advance and reverse', 'no scroll input listeners', 'only main title animates text', 'default motion, legacy storage ignored, live reduced motion', 'blocked storage', 'no JavaScript', 'navigation', 'no overflow or page errors']}, ensure_ascii=False))
    browser.close()
