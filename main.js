import core from './script/core.js'

document.addEventListener('DOMContentLoaded', async () => {
  console.log('DOM fully loaded and parsed');

  await core.init()
});
