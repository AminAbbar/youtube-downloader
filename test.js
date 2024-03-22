const cli = require('ytdl-core')
const fs = require('fs');
const { format } = require('path');
const ffmpeg = require('fluent-ffmpeg');



    
//     const {
        
//         formats:formats,
//         videoDetails: {title , lengthSeconds , publishDate ,author:{name , channel_url , thumbnails , subscriber_count} ,
        
//         [thumbnails[thumbnails.length - 1]]:thumbnail
//         }
        
// } = await cli.getBasicInfo('https://www.youtube.com/watch?v=eZJx65ATvs0');
    
    // console.log(formats.filter((video)=> video.mimeType.includes('video/mp4') && video.audioQuality == 'AUDIO_QUALITY_MEDIUM'))

    
    (async () => {
        const videoUrl = 'https://www.youtube.com/watch?v=Yox5UOc7Gms&t=282s';
    let info = await cli.getInfo(videoUrl);
    let tags = [160, 133, 134, 135, 136, 299]; // Available itags
    let selectedFormat = null;
    console.log(info.formats)

    for (let tag of tags) {
        let format = info.formats.find(format => format.itag === tag);
        if (format) {
            selectedFormat = format;
            break;
        }
    }

    if (selectedFormat) {
        console.log('Selected Format:', selectedFormat);
        const videoFile = 'video.mp4';
        const audioFile = 'audio.mp3';


        try {
            await new Promise((resolve, reject) => {
                cli(videoUrl, { quality: selectedFormat.itag })
                    .pipe(fs.createWriteStream(videoFile))
                    .on('finish', () => {
                        console.log('Video downloaded successfully!');
                        resolve();
                    })
                    .on('error', reject);
            });

            await new Promise((resolve, reject) => {
                cli(videoUrl, { quality: '140' })
                    .pipe(fs.createWriteStream(audioFile))
                    .on('finish', () => {
                        console.log('Audio downloaded successfully!');
                        resolve();
                    })
                    .on('error', reject);
            });

            await new Promise((resolve, reject) => {
                ffmpeg()
                    .input(videoFile)
                    .input(audioFile)
                    .outputOptions('-c:v copy')
                    .outputOptions('-c:a aac')
                    .outputOptions('-strict experimental')
                    .save('output.mp4')
                    .on('end', () => {
                        console.log('Video and audio merged successfully!');
                        resolve();
                    })
                    .on('error', reject);
            });

            // Clean up temporary files if needed
            fs.unlinkSync(videoFile);
            fs.unlinkSync(audioFile);
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        console.log('No matching format found for the specified tags.');
    }
    })();
    