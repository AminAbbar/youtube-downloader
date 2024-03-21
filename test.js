const cli = require('ytdl-core')
const fs = require('fs');

;(async()=>[

    cli('http://www.youtube.com/watch?v=aqz-KE-bpKQ')
      .pipe(fs.createWriteStream('video.mp4'))
    // console.log(await cli.getBasicInfo('https://www.youtube.com/watch?v=eZJx65ATvs0'))


])();