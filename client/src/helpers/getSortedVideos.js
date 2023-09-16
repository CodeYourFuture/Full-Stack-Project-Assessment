export const getSortedVideos = (videos) => {
    return videos.sort((a, b) => b.rating - a.rating);
}