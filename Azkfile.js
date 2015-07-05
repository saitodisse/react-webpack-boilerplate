systems({
  ppp: {
    // Dependent systems
    depends: [],

    // More images:  http://images.azk.io
    image: {docker: 'library/iojs:latest'},

    // Steps to execute before running instances
    provision: [
      'npm install'
    ],
    workdir: '/azk/#{manifest.dir}',
    shell: '/bin/bash',
    command: 'npm start',

    wait: {retry: 20, timeout: 1000},

    mounts: {
      '/azk/#{manifest.dir}': sync('.'),
      '/azk/#{manifest.dir}/node_modules': persistent('#{system.name}/node_modules')
    },

    scalable: {default: 1},
    http: {
      domains: ['#{system.name}.#{azk.default_domain}']
    },
    ports: {
      // exports global variables
      main:  '3000:3000/tcp',
      http:  '3001/tcp'
    },
    envs: {
      // Make sure that the PORT value is the same as the one
      // in ports/http below, and that it's also the same
      // if you're setting it in a .env file
      HOT_HOST_NAME: '#{system.name}.#{azk.default_domain}',
      NODE_ENV: 'dev',
      PATH: 'node_modules/.bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin'
    },
    export_envs: {
      MAIN_HOST_FULL: 'http://#{net.host}:#{net.port.main}'
    }
  }
});
