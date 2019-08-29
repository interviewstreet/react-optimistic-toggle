const path = require('path');

const pkg = require('./package.json');

module.exports = {
  title: 'Docs - React Optimistic Toggle',
  version: pkg.version,
  usageMode: 'expand',
  sections: [
    {
      name: 'Getting Started',
      content: 'src/getting-started.docs.md',
    },
    {
      name: 'Examples',
      components: 'src/**/*.js',
    },
  ],
  ribbon: {
    url: 'https://www.npmjs.com/package/react-optimistic-toggle',
    text: 'Install from npm',
  },
  getExampleFilename(componentPath) {
    return componentPath.replace(/\.jsx?$/, '.docs.md');
  },
  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath, '.js');
    const dir = path.dirname(componentPath);
    return `import ${name} from '${pkg.name}/${name}';`;
  },
  updateDocs(docs) {
    const visibleNameMapper = {
      UseOptimisticToggle: 'useOptimisticToggle',
    };

    docs.displayName = visibleNameMapper[docs.displayName] || docs.displayName;
    return docs;
  },
};
