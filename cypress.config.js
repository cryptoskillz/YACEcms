const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: "cqoxqk",
  e2e: {
    baseUrl: 'http://localhost:8789/login/',
  }
})