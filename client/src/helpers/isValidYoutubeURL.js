export const isValidYouTubeURL = (url) => {
    const youtubeUrlPattern = /^(http(s)?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]+$/;
    return youtubeUrlPattern.test(url);
};