/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';

import { formatBytes } from '../utils/format.js';
import { createHTML } from '../utils/markup.js';

import { ContentArea, ContentAreaHeaderBar } from './ContentArea.js';

function getBasename(path) {
  let segments = path.split('/');
  return segments[segments.length - 1];
}

function ImageViewer({ path, uri }) {
  return (
    <div css={{ padding: 20, textAlign: 'center' }}>
      <img alt={getBasename(path)} src={uri} />
    </div>
  );
}

function CodeListing({ highlights }) {
  let lines = highlights.slice(0);
  let hasTrailingNewline = lines.length && lines[lines.length - 1] === '';
  if (hasTrailingNewline) {
    lines.pop();
  }

  return (
    <div
      className="code-listing"
      css={{
        overflowX: 'auto',
        overflowY: 'hidden',
        paddingTop: 5,
        paddingBottom: 5
      }}
    >
      <table
        css={{
          border: 'none',
          borderCollapse: 'collapse',
          borderSpacing: 0
        }}
      >
        <tbody>
          {lines.map((line, index) => {
            let lineNumber = index + 1;

            return (
              <tr key={index}>
                <td
                  id={`L${lineNumber}`}
                  css={{
                    paddingLeft: 10,
                    paddingRight: 10,
                    color: 'rgba(27,31,35,.3)',
                    textAlign: 'right',
                    fontVariant: 'tabular-nums',
                    verticalAlign: 'top',
                    width: '1%',
                    minWidth: 50,
                    userSelect: 'none'
                  }}
                >
                  <span>{lineNumber}</span>
                </td>
                <td
                  id={`LC${lineNumber}`}
                  css={{
                    paddingLeft: 10,
                    paddingRight: 10,
                    color: '#24292e',
                    whiteSpace: 'pre'
                  }}
                >
                  <code dangerouslySetInnerHTML={createHTML(line)} />
                </td>
              </tr>
            );
          })}
          {!hasTrailingNewline && (
            <tr key="no-newline">
              <td
                css={{
                  paddingLeft: 10,
                  paddingRight: 10,
                  color: 'rgba(27,31,35,.3)',
                  textAlign: 'right',
                  verticalAlign: 'top',
                  width: '1%',
                  minWidth: 50,
                  userSelect: 'none'
                }}
              >
                \
              </td>
              <td
                css={{
                  paddingLeft: 10,
                  color: 'rgba(27,31,35,.3)',
                  userSelect: 'none'
                }}
              >
                No newline at end of file
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function BinaryViewer() {
  return (
    <div css={{ padding: 20 }}>
      <p css={{ textAlign: 'center' }}>No preview available.</p>
    </div>
  );
}

export default function FileViewer({
  packageName,
  packageVersion,
  path,
  details
}) {
  let { highlights, uri, language, size } = details;

  return (
    <ContentArea>
      <ContentAreaHeaderBar>
        <span>{formatBytes(size)}</span>
        <span>{language}</span>
        <span>
          <a
            href={`/${packageName}@${packageVersion}${path}`}
            css={{
              display: 'inline-block',
              marginLeft: 8,
              padding: '2px 8px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              color: '#24292e',
              backgroundColor: '#eff3f6',
              border: '1px solid rgba(27,31,35,.2)',
              borderRadius: 3,
              ':hover': {
                backgroundColor: '#e6ebf1',
                borderColor: 'rgba(27,31,35,.35)'
              },
              ':active': {
                backgroundColor: '#e9ecef',
                borderColor: 'rgba(27,31,35,.35)',
                boxShadow: 'inset 0 0.15em 0.3em rgba(27,31,35,.15)'
              }
            }}
          >
            View Raw
          </a>
        </span>
      </ContentAreaHeaderBar>

      {highlights ? (
        <CodeListing highlights={highlights} />
      ) : uri ? (
        <ImageViewer path={path} uri={uri} />
      ) : (
        <BinaryViewer />
      )}
    </ContentArea>
  );
}

if (process.env.NODE_ENV !== 'production') {
  FileViewer.propTypes = {
    path: PropTypes.string.isRequired,
    details: PropTypes.shape({
      contentType: PropTypes.string.isRequired,
      highlights: PropTypes.arrayOf(PropTypes.string), // code
      uri: PropTypes.string, // images
      integrity: PropTypes.string.isRequired,
      language: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired
    }).isRequired
  };
}
