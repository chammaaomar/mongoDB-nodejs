const Post = require('./post')

const postByTitle = async (qTitle) => {
    const post = await Post.findOne({title: qTitle}).exec();
    if (!post) {
        throw new Error(`No post with title ${qTitle} found`);
    }
    return post;
}

const postsForAuthor = async (authorId) => {
    const postsByAuthor = await Post.find({author: authorId}).exec();
    if (!postsByAuthor) {
        throw new Error(`No posts found by author ${authorId}`);
    }
    return postsByAuthor;
}

const fullPostById = async (id) => {
    const post = await Post.findOne({_id: id}).populate('author').populate('post').exec();
    if (!post) {
        throw new Error(`Post with id ${id} not found`);
    }
    return post;
}

const allPostsSlim = async (fieldsToSelect) => {
    const slimPosts = await Post.find({}, fieldsToSelect).exec();
    if (slimPosts.every(v => !v)) {
        throw new Error('One or more fields selected is invalid');
    }
    return slimPosts;
}

const postByContentLength = async (maxContentLength, minContentLength) => {
  const posts = await Post.find({contentLength: {$gt: minContentLength, $lt: maxContentLength}}).exec();
  if (!posts) {
    throw new Error('No article found with specified criteria');
  }
  return posts;
}

const addSimilarPosts = async (postId, newSimilarPosts) => {
   const addPosts = await Post.findOneAndUpdate({_id: postId}, {$push: {similarPosts: newSimilarPosts}}, {new:true}).exec();
   if (!addPosts) {
     throw new Error('Could not add posts');
   }
   return addPosts;
}

module.exports = {
  postByTitle,
  postsForAuthor,
  fullPostById,
  allPostsSlim,
  postByContentLength,
  addSimilarPosts
}
