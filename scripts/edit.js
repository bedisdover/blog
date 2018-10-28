const { spawn } = require('child_process');

hexo.on('new', function(data){
  spawn('vim', [data.path], { stdio: 'inherit' })
});

