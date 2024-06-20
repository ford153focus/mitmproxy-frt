// eslint-disable-next-line no-undef
let contents1 = ytInitialData['contents']['twoColumnBrowseResultsRenderer']['tabs'][0]['tabRenderer']['content']['sectionListRenderer']['contents'];

for (let content1 of contents1) {
    let contents2 = content1?.itemSectionRenderer?.contents;
    if (!contents2) continue;

    for (let content2 of contents2) {
        let videoId = content2?.videoRenderer?.videoId;
        if (!videoId) continue;
        console.log(videoId);

        try {
            let output = window._frt.Fetchers.fetchSync(`http://192.168.1.44:7965/yt/videos/mark/${videoId}`);
            console.log(output);
        } catch (error) {
            console.warn(error);
        }
    }
}
