const User = require('./user')

const getUserById = async (id) => {
    const user = await User.findById({_id: id}).exec();
    if (user === null) {
        throw new Error('User not found ');
    }
    return user;
}

const getAllUsers = async () => {
    const users = await User.find({}).exec();
    return users;
}

const createUser = async (userDetails) => {
    const newUser = await User.create(userDetails);
    if (!newUser) {
        throw new Error('Could not create user');
    }
    return newUser;
}
const removeUserById = async (id) => {
    const deletedUser = await User.findByIdAndRemove({_id: id}).exec();
    if (!deletedUser) {
        throw new Error('Could not find user');
    }
    return deletedUser;
}

const updateUserById = async (id, update) => {
    // option: return the updated object
    const updatedUser = await User.findByIdAndUpdate({_id: id},update, {new: true}).exec();
    if (!updatedUser) {
        throw new Error('Could not find user to update');
    }
    return updatedUser;
}

module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  removeUserById,
  updateUserById
}
