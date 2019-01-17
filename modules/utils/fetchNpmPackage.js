const url = require('url');
const https = require('https');
const gunzip = require('gunzip-maybe');
const tar = require('tar-stream');

const bufferStream = require('./bufferStream');
const agent = require('./registryAgent');
const logging = require('./logging');
const createRequestOptions = require('./createRequestOptions');

// added npmrc parameter to function decleration for
// use in generating NPM bearer authentication header
function fetchNpmPackage(packageConfig, npmrc) {

  return new Promise((resolve, reject) => {
    const tarballURL = packageConfig.dist.tarball;

    logging.debug(
      'Fetching package for %s from %s',
      packageConfig.name,
      tarballURL
    );

    const { hostname, pathname } = url.parse(tarballURL);
    const options = createRequestOptions({
      agent: agent,
      hostname: hostname,
      path: pathname
    }, npmrc);

    https
      .get(options, res => {
        if (res.statusCode === 200) {
          resolve(res.pipe(gunzip()).pipe(tar.extract()));
        } else {
          bufferStream(res).then(data => {
            const spec = `${packageConfig.name}@${packageConfig.version}`;
            const content = data.toString('utf-8');
            const error = new Error(
              `Failed to fetch tarball for ${spec}\nstatus: ${
                res.statusCode
              }\ndata: ${content}`
            );

            reject(error);
          });
        }
      })
      .on('error', reject);
  });
}

module.exports = fetchNpmPackage;
