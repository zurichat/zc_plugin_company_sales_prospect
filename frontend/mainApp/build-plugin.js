const shell = require('shelljs')
const package = require('./package.json')

function run() {
  const reDomain = /^(?:https?:\/\/)?([a-zA-Z0-9-]+\.zuri\.chat)\/?$/
  const reTestingDomain = /^(?:https?:\/\/)?(.+?)\/?$/

  let { pluginDomain, pluginTestingDomain } = package

  if (!pluginDomain && !pluginTestingDomain) {
    console.error(
      `You need to define either a pluginDomain or a pluginTestingDomain`
    )
    process.exit(1)
  } else if (pluginDomain && !reDomain.test(pluginDomain)) {
    console.error(
      `pluginDomain is invalid.\nMake sure the pluginDomain in your package.json is set to a valid plugin url.`
    )
    process.exit(1)
  } else if (
    pluginTestingDomain &&
    !reTestingDomain.test(pluginTestingDomain)
  ) {
    console.error(`pluginTestingDomain is invalid.`)
    process.exit(1)
  }

  let domain = pluginDomain || pluginTestingDomain
  domain = domain.replace(
    pluginDomain ? reDomain : reTestingDomain,
    'https://$1/'
  )

  shell.cd(__dirname)
  shell.env['PUBLIC_URL'] = pluginDomain
  shell.exec('craco build')
}

if (require.main === module) {
  run()
}
