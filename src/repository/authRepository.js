class AuthRepository {
    constructor(model) {
      this.authModel = model;
    }
  
    async register(body) {
      const newUser = await this.authModel.create(body);
      return newUser;
    }
  
    async findUserByEmail(email) {
      const user = await this.authModel.findOne({ email });
      return user;
    }

    async updateUserById(userId, userData) {
      const editedUser = await this.authModel.findByIdAndUpdate(
        userId,
        userData,
        { new: true },
      );
      return editedUser;
    }

    async findAllByUserName(name) {
      const users = await this.authModel.find({ name: { $regex: new RegExp(name, 'i') }});
      return users;
  }

  async deleteOneById(userId) {
    await this.authModel.findByIdAndDelete(userId);    
  }

  }
  
  export default AuthRepository;
  