// Styles
import "./stylesheets/jolicode.css";

import { createHighlighterCore } from 'shiki/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'
import { default as css } from '@shikijs/langs/css'
import { default as html } from '@shikijs/langs/html'
import { default as javascript } from '@shikijs/langs/javascript'
import { default as json } from '@shikijs/langs/json'
import { default as php } from '@shikijs/langs/php'
import { default as shellscript } from '@shikijs/langs/shellscript'
import { default as twig } from '@shikijs/langs/twig'
import { default as xml } from '@shikijs/langs/xml'
import { default as yaml } from '@shikijs/langs/yaml'

const languages = {
    'bash': 'shellscript',
    'console': 'shellscript',
    'css': 'css',
    'html': 'html',
    'html+twig': 'twig',
    'javascript': 'javascript',
    'json': 'json',
    'php': 'php',
    'sh': 'shellscript',
    'shellscript': 'shellscript',
    'terminal': 'shellscript',
    'twig': 'twig',
    'xml': 'xml',
    'yaml': 'yaml',
};

const highlighter = await createHighlighterCore({
    themes: [
        import('shiki/themes/monokai.mjs')
    ],
    langs: [
        css,
        html,
        javascript,
        json,
        php,
        shellscript,
        twig,
        xml,
        yaml,
    ],
    engine: createOnigurumaEngine(import('shiki/wasm')),
});

document$.subscribe(function() {
    const highlightedNodes = document.querySelectorAll('pre:has(> code[class*="language-"])');

    highlightedNodes.forEach(async (pre) => {
        const language = pre.children[1].className.replace('language-', '');
        replacePreNode(pre, language);
    });

    const highlightedSourcecodeNodes = document.querySelectorAll('pre.sourceCode:has(> code.sourceCode)');

    highlightedSourcecodeNodes.forEach(async (pre) => {
        const language = pre.className.replace('sourceCode ', '');
        replacePreNode(pre, language);
    });
});

async function replacePreNode(pre, language) {
    if (!Object.keys(languages).includes(language)) {
        return;
    }

    const copyButton = pre.children[0];
    const highlightedHtmlString = await highlighter.codeToHtml(pre.textContent, {
        lang: languages[language],
        theme: 'monokai',
        colorReplacements: {
        '#272822': '#292929'
        }
    });

    const parser = new DOMParser();
    const highlightedNode = parser.parseFromString(highlightedHtmlString, "text/html");
    const replacement = highlightedNode.body.firstChild;
    replacement.firstChild.setAttribute('style', replacement.getAttribute('style'));
    copyButton.setAttribute('style', '--md-default-fg-color--light: #ffffff80;');
    replacement.insertBefore(copyButton, replacement.firstChild);
    replacement.id = pre.id;
    pre.replaceWith(highlightedNode.body.firstChild);
}
