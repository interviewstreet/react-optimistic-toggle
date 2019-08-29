const path = require('path');

const pkg = require('./package.json');

module.exports = {
  title: 'Docs - React Optimistic Toggle',
  version: pkg.version,
  components: 'src/**/*.js',
  usageMode: 'expand',
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
