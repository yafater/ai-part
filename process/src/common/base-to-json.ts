export const baseToJson = {
  virtuals: true,
  transform: function (_, ret) {
    const id = ret._id;
    delete ret._id;
    delete ret.__v;
    return {
      id,
      ...ret,
    };
  },
};
