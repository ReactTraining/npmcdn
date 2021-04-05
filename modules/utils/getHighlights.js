import path from 'path';
import hljs from 'highlight.js';

import getContentType from './getContentType.js';

function escapeHTML(code) {
  return code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// These should probably be added to highlight.js auto-detection.
const extLanguages = {
  cjs: 'javascript',
  map: 'json',
  mjs: 'javascript',
  tsbuildinfo: 'json',
  tsx: 'typescript',
  txt: 'text',
  vue: 'html'
};

function getLanguage(file) {
  // Try to guess the language based on the file extension.
  const ext = path.extname(file).substr(1);

  if (ext) {
    return extLanguages[ext] || ext;
  }

  const contentType = getContentType(file);

  if (contentType === 'text/plain') {
    return 'text';
  }

  return null;
}

function getLines(code) {
  return code
    .split('\n')
    .map((line, index, array) =>
      index === array.length - 1 ? line : line + '\n'
    );
}

/**
 * Returns an array of HTML strings that highlight the given source code.
 */
export default function getHighlights(code, file) {
  const language = getLanguage(file);

  if (!language) {
    return null;
  }

  if (language === 'text') {
    return getLines(code).map(escapeHTML);
  }

  try {
    let continuation = false;
    const hi = getLines(code).map(line => {
      const result = hljs.highlight(language, line, false, continuation);
      continuation = result.top;
      return result;
    });

    return hi.map(result =>
      result.value.replace(
        /<span class="hljs-(\w+)">/g,
        '<span class="code-$1">'
      )
    );
  } catch (error) {
    // Probably an "unknown language" error.
    // console.error(error);
    return null;
  }
}
