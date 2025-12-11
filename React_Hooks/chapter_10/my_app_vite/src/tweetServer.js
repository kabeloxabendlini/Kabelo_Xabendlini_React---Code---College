const tweets = {}

const likeTweet = async (tweetId) => {
    const randomLikes = Math.floor(Math.random() * 10) + 1

    if (tweets[tweetId]) {
        tweets[tweetId].likes += randomLikes
    } else {
        tweets[tweetId] = { likes: randomLikes }
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tweets[tweetId].likes)
        }, 2000)
    })
}

const getLikes = async (tweetId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tweets[tweetId] ? tweets[tweetId].likes : 0)
        }, 1000)
    })
}

export { likeTweet, getLikes }