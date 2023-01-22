const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: "cqoxqk",
  e2e: {
        experimentalSessionAndOrigin: true,
    baseUrl: 'http://localhost:8789/login/',
  }
})