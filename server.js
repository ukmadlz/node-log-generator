const Generator = require('./generator');

const startScript = () => {
  Generator.generator();
  setTimeout(startScript, 10000);
}

startScript();