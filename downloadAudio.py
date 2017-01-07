import youtube_dl


options = {
    'format':'bestaudio/best',
    'extractaudio':True,
    'audioformat':'mp3',
    'outtmpl': u'%(id)s.%(ext)s',     #name the file the ID of the video
    'noplaylist':True,
    'nocheckcertificate':True,
    'postprocessors': [{
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'mp3',
        'preferredquality': '192',
    }]
}

with youtube_dl.YoutubeDL(options) as ydl:
    ydl.download(['https://www.youtube.com/watch?v=LHPKOy3dtqQ'])


##from __future__ import unicode_literals
##import youtube_dl
##
##
##ydl_opts = {
##    'format': 'bestaudio/best',
##    'postprocessors': [{
##        'key': 'FFmpegExtractAudio',
##        'preferredcodec': 'm4a',
##        'preferredquality': '192',
##    }],
##}
##with youtube_dl.YoutubeDL(ydl_opts) as ydl:
##    ydl.download(['https://www.youtube.com/watch?v=UqyT8IEBkvY'])
