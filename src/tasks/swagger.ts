// import * as swaggerJSDoc from 'swagger-jsdoc';
import swaggerJSDoc = require('swagger-jsdoc');
import * as fs from 'fs';
import * as glob from 'glob';

const ctrls = glob.sync('./dist/modules/**/controllers/*.js');
const models = glob.sync('./dist/modules/**/models/*.js');
const { version, name, description } = require('../../package.json');

const options = {
  swaggerDefinition: {
    info: {
      title: name,
      version,
      description
    }
  },
  apis: [ ...models, ...ctrls ]
};

const spec = swaggerJSDoc(options);
fs.writeFile('./dist/spec.json', JSON.stringify(spec, null, '\t'), null);
