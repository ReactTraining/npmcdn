import path from 'path';
import mime from 'mime';

mime.define(
  {
    'text/javascript': ['mjs'],
    'text/plain': [
      'authors',
      'changes',
      'license',
      'makefile',
      'patents',
      'readme',
      'ts',
      'flow'
    ]
  },
  /* force */ true
);

const textFiles = /\/?(\.[a-z]*rc|\.git[a-z]*|\.[a-z]*ignore|\.lock)$/i;

export default function getContentType(file) {
  const name = path.basename(file);

  return textFiles.test(name)
    ? 'text/plain'
    : mime.getType(name) || 'text/plain';
}
