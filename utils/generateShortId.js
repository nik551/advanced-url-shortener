const generateShortId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortId = '';
    for (let i = 0; i < 6; i++) {
      shortId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return shortId;
  };
  
  module.exports = generateShortId;